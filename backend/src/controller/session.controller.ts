// * 12 - Create Session controllers

import { validatePassword } from '../service/user.service'
import { Request, Response } from 'express'
import { createAccessToken, createSession } from '../service/session.service'
import config from 'config'
import { sign } from '../utils/jwt.utils'

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the email and password
  const user = await validatePassword(req.body)

  if (!user) {
    return res.status(401).send('Invalid username or password')
  }
  // Create a session
  const session = await createSession(user._id, req.get('user-agent') || '')

  // Create access token
  const accessToken = createAccessToken({
    user,
    session
  })

  // Create refresh Token
  const refreshToken = sign(session, {
    expiresIn: config.get('refreshTokenTtl')
  })

  // Send refresh & Access token back
  return res.send({ accessToken, refreshToken })
}
