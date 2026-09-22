import express, { type NextFunction, type Request, type Response } from 'express'
import { connectDatabase } from './config/database.js'
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js'
import { createResourceRouter } from './routes/resourceRouter.js'

//import and configure express application
const app = express()
const port = Number(process.env.PORT ?? 8000)
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())

// CORS middleware to handle cross-origin requests
app.use((request: Request, response: Response, next: NextFunction) => {
  const origin = request.headers.origin
  const isAllowedOrigin = origin && (
    origin === 'http://localhost:5173' ||
    origin === 'http://127.0.0.1:5173' ||
    (codespaceName && origin === `https://${codespaceName}-5173.app.github.dev`)
  )

  if (isAllowedOrigin) response.setHeader('Access-Control-Allow-Origin', origin)
  response.setHeader('Vary', 'Origin')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')

  if (request.method === 'OPTIONS') {
    response.sendStatus(204)
    return
  }

  next()
})

app.get('/api/health', (_request: Request, response: Response) => {
  response.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    apiBaseUrl,
  })
})

// Register resource routes
app.use('/api/users/', createResourceRouter('users', User))
app.use('/api/teams/', createResourceRouter('teams', Team))
app.use('/api/activities/', createResourceRouter('activities', Activity))
app.use('/api/leaderboard/', createResourceRouter('leaderboard', Leaderboard))
app.use('/api/workouts/', createResourceRouter('workouts', Workout))

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to octofit_db:', error)
    process.exit(1)
  })
