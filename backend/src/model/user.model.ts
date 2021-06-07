// * 6 - Create the user model

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'

// Interface
export interface UserInput {
  email: string
  firstName: string
  lastName: string
  password: string
}
export interface UserDocumentInterface extends UserInput, mongoose.Document {
  email: string
  firstName: string
  lastName: string
  fullName: string
  password: string
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

// User Schema
const userSchema = new mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    password: { type: String, required: true }
  },
  { timestamps: true }
)

// userSchema.index({ email: 1 })

// Mongoose Virtual Methods
userSchema.virtual('fullName').get(function (this: UserDocumentInterface) {
  return `${this.firstName} ${this.lastName}`
})

// Mongoose PreSave method to hash the password if required
userSchema.pre('save', async function (next: mongoose.HookNextFunction) {
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

// Used for logging in - Compare a candidate password with the user's password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocumentInterface
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false)
}

// User Model
const User = mongoose.model<UserDocumentInterface>('User', userSchema)

export default User
