// * 5 - Create the routes

import { Express, Request, Response } from 'express'
import { createUserHandler } from './controller/user.controller'
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler
} from './controller/session.controller'
import { validateRequest, requireUser } from './middleware'
import { createUserSchema, createUserSessionSchema } from './schema/user.schema'

export default function (app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))
  // Test everthing is running properly by processing ac curl request in the terminal.
  // curl http://localhost:5002/healthcheck in the console

  // Register user
  // POST /api/user
  app.post('/api/users', validateRequest(createUserSchema), createUserHandler)

  // Login
  // POST /api/sessions
  app.post(
    '/api/sessions',
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  )

  // Get the user's sessions
  // GET /api/sessions
  app.get('/api/sessions', requireUser, getUserSessionsHandler)
  // Logout
  // DELETE /api/sessions
  app.delete('/api/sessions', requireUser, invalidateUserSessionHandler)
}
