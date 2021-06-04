// * 5 - Create the routes

import { Express, Request, Response } from 'express'

export default function (app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

  // Register user

  // Login

  // Get the user's sessions

  // Logout
}
