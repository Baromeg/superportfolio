// * 6 - Create the user model

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'

// Interface
export interface UserDocumentInterface extends mongoose.Document {
  email: string
  name: string
  password: string
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

// User Schema
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
)

UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
  let user = this as UserDocumentInterface

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // Random additional data
  const salt = await bcrypt.genSalt(config.get('saltWorkFactor'))
  const hash = await bcrypt.hashSync(user.password, salt)

  // Replace the password with the hash
  user.password = hash

  return next()
})

// Used for logging in
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocumentInterface
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false)
}

// User Model
const User = mongoose.model<UserDocumentInterface>('User', UserSchema)

export default User
