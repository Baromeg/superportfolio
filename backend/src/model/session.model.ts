// * 11 - Create the Session model

import mongoose from 'mongoose'
import { UserDocumentInterface } from './user.model'

// Interface
export interface SessionDocumentInterface extends mongoose.Document {
  user: UserDocumentInterface['_id']
  valid: boolean
  userAgent: string
  createdAt: Date
  updatedAt: Date
}

// User Schema
const SessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: { type: String }
  },
  { timestamps: true }
)

// User Model
const Session = mongoose.model<SessionDocumentInterface>(
  'Session',
  SessionSchema
)

export default Session
