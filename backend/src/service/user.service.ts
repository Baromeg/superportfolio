// * 7 - Create the service functions

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

function findUser() {}
