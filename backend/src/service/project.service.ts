// * 17 - Project Service Methods

import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions
} from 'mongoose'
import Project, { ProjectDocumentInterface } from '../model/project.model'

export function createProject(
  input: DocumentDefinition<ProjectDocumentInterface>
) {
  return Project.create(input)
}

export function findProject(
  query: FilterQuery<ProjectDocumentInterface>,
  options: QueryOptions = { lean: true }
) {
  return Project.findOne(query, {}, options)
}
export function findAndUpdate(
  query: FilterQuery<ProjectDocumentInterface>,
  update: UpdateQuery<ProjectDocumentInterface>,
  options: QueryOptions
) {
  return Project.findOneAndUpdate(query, update, options)
}

export function deleteProject(query: FilterQuery<ProjectDocumentInterface>) {
  return Project.deleteOne(query)
}
