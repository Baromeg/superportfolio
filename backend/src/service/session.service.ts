// * 13 - Session Service

import { LeanDocument, FilterQuery, UpdateQuery } from 'mongoose'
import Session, { SessionDocumentInterface } from '../model/session.model'
import { UserDocumentInterface } from '../model/user.model'
import { findUser } from './user.service'
import config from 'config'
import { get } from 'lodash'
import { sign, decode } from '../utils/jwt.utils'

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

export async function reIssueAccessToken({
  refreshToken
}: {
  refreshToken: string
}) {
  // Decoded the refresh token
  const { decoded } = decode(refreshToken)

  if (!decoded || !get(decoded, '_id')) return false

  // Get the session
  const session = await Session.findById(get(decoded, '_id'))

  // GMake sure the session is still valid
  if (!session || !session?.valid) return false

  const user = await findUser({ _id: session.user })

  if (!user) return false

  const accessToken = createAccessToken({ user, session })
}

export async function updateSession(
  query: FilterQuery<SessionDocumentInterface>,
  update: UpdateQuery<SessionDocumentInterface>
) {
  return Session.updateOne(query, update)
}

export async function findSessions(
  query: FilterQuery<SessionDocumentInterface>
) {
  return Session.find(query).lean()
}
