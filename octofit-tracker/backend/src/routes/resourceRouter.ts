import { type NextFunction, type Request, type Response, Router } from 'express'
import type { OctofitModel } from '../models/index.js'

function populateResource(resource: string, query: any) {
  if (resource === 'teams') query.populate('members')
  if (resource === 'activities' || resource === 'leaderboard') query.populate('user')
  return query
}

function handleResourceError(error: unknown, response: Response, next: NextFunction) {
  if (error instanceof Error && (error.name === 'CastError' || error.name === 'ValidationError')) {
    response.status(400).json({ error: error.message })
    return
  }

  next(error)
}

export function createResourceRouter(resource: string, model: OctofitModel) {
  const router = Router()

  router.get('/', async (_request: Request, response: Response, next: NextFunction) => {
    try {
      const query = populateResource(resource, model.find())
      response.json(await query.lean())
    } catch (error) {
      handleResourceError(error, response, next)
    }
  })

  router.post('/', async (request: Request, response: Response, next: NextFunction) => {
    try {
      const record = await model.create(request.body)
      response.status(201).json(record)
    } catch (error) {
      handleResourceError(error, response, next)
    }
  })

  router.get('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
      const query = populateResource(resource, model.findById(request.params.id))
      const record = await query.lean()

      if (!record) {
        response.status(404).json({ error: 'Record not found' })
        return
      }

      response.json(record)
    } catch (error) {
      handleResourceError(error, response, next)
    }
  })

  router.put('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
      const record = await model.findById(request.params.id)

      if (!record) {
        response.status(404).json({ error: 'Record not found' })
        return
      }

      record.set(request.body)
      await record.save()
      response.json(record)
    } catch (error) {
      handleResourceError(error, response, next)
    }
  })

  router.delete('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
      const record = await model.findByIdAndDelete(request.params.id)

      if (!record) {
        response.status(404).json({ error: 'Record not found' })
        return
      }

      response.status(204).end()
    } catch (error) {
      handleResourceError(error, response, next)
    }
  })

  router.get('/status', async (_request: Request, response: Response, next: NextFunction) => {
    try {
      response.json({ resource, count: await model.countDocuments() })
    } catch (error) {
      handleResourceError(error, response, next)
    }
  })

  return router
}