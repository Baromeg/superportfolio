// * 7 - Create the service Methods

import { omit } from 'lodash'
import { DocumentDefinition, FilterQuery, UpdateQuery } from 'mongoose'
import { SessionDocumentInterface } from '../model/session.model'
import User, { UserDocumentInterface, UserInput } from '../model/user.model'

export async function createUser(input: DocumentDefinition<UserInput>) {
  try {
    return await User.create(input)
  } catch (error) {
    throw new Error(error)
  }
}

export async function findUser(query: FilterQuery<UserDocumentInterface>) {
  return User.findOne(query).lean()
}

// Validate password
export async function validatePassword({
  email,
  password
}: {
  email: UserDocumentInterface['email']
  password: UserDocumentInterface['password']
}) {
  const user = await User.findOne({ email })

  if (!user) {
    return false
  }

  const isValid = await user.comparePassword(password)

  if (!isValid) {
    return false
  }

  return omit(user.toJSON(), 'password')
}

export async function deleteAllUsers() {
  return User.deleteMany({})
}
