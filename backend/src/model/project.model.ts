// * 18 - Project Model

import mongoose from 'mongoose'
import { nanoid } from 'nanoid'
import { UserDocumentInterface } from './user.model'

export interface ProjectDocumentInterface extends mongoose.Document {
  user: UserDocumentInterface['_id']
  title: string
  body: string
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10)
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, default: true },
    body: { type: String, default: true }
  },
  { timestamps: true }
)

const Project = mongoose.model<ProjectDocumentInterface>(
  'Project',
  ProjectSchema
)

export default Project
