// * 13 - Session Service

import { LeanDocument } from 'mongoose'
import Session, { SessionDocumentInterface } from '../model/session.model'
import { UserDocumentInterface } from '../model/user.model'
import config from 'config'

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent })

  return session.toJSON()
}

export function createAccessToken({
  user,
  session
}: {
  user:
    | Omit<UserDocumentInterface, 'password'>
    | LeanDocument<Omit<UserDocumentInterface, 'password'>>
  session:
    | Omit<SessionDocumentInterface, 'password'>
    | LeanDocument<Omit<SessionDocumentInterface, 'password'>>
}) {
  // Build and return the new access token
  const accesstoken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get('accessTokenTtl') }
  )
  return accesstoken
}
