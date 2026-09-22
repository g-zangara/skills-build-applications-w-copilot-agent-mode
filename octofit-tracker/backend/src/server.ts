import express from 'express'
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

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    apiBaseUrl,
  })
})

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
