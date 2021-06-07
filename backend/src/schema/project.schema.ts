// * 15 - Project Schema

import { object, string, ref } from 'yup'

const payload = {
  body: object({
    title: string().required('Title is required'),
    body: string()
      .required('Body is required')
      .min(120, 'Body is too short - should be 120 chars minimum.')
  })
}

const params = {
  params: object({
    projectId: string().required('ProjectId is required')
  })
}

export const createProjectSchema = object({ ...payload })

export const updateProjectSchema = object({
  ...params,
  ...payload
})

export const deleteProjectSchema = object({
  ...params
})
