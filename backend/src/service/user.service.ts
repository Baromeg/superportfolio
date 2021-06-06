// * 7 - Create the service functions

import { omit } from 'lodash'
import { DocumentDefinition } from 'mongoose'
import User, { UserDocumentInterface } from '../model/user.model'

export async function createUser(
  input: DocumentDefinition<UserDocumentInterface>
) {
  try {
    return await User.create(input)
  } catch (error) {
    throw new Error(error)
  }
}

export async function findUser(query: FilterQuery<UserDocumentInterface>) {
  return UserModel.findOne(query).lean()
}

// Validate password
export async function validatePassword({
  email,
  password
}: {
  email: UserDocumentInterface['email']
  password: string
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
