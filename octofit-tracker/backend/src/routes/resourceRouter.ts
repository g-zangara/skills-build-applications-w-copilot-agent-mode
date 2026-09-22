import { Router } from 'express'
import type { OctofitModel } from '../models/index.js'

export function createResourceRouter(resource: string, model: OctofitModel) {
  const router = Router()

  router.get('/', async (_request, response, next) => {
    try {
      const query = model.find()
      if (resource === 'teams') query.populate('members')
      if (resource === 'activities' || resource === 'leaderboard') query.populate('user')
      response.json(await query.lean())
    } catch (error) {
      next(error)
    }
  })

  router.post('/', async (request, response, next) => {
    try {
      const record = await model.create(request.body)
      response.status(201).json(record)
    } catch (error) {
      next(error)
    }
  })

  router.get('/status', async (_request, response, next) => {
    try {
      response.json({ resource, count: await model.countDocuments() })
    } catch (error) {
      next(error)
    }
  })

  return router
}