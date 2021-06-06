// * 5 - Create the routes

import { Express, Request, Response } from 'express'

export default function (app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))
  // Test everthing is running properly by processing ac curl request in the terminal.
  // curl http://localhost:5002/healthcheck in the console

  // Register user
  // POST /api/user

  // Login
  // POST /api/sessions

  // Get the user's sessions
  // GET /api/sessions

  // Logout
  // DELETE /api/sessions
}
