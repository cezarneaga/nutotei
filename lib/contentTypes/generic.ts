import { Document } from '@contentful/rich-text-types'

export type RichText = {
  json: Document
}

export type Image = {
  url: string
  fileName?: string
  description?: string
  title?: string
  width?: number
  height?: number
}

export type Collection<T> = {
  items: T[]
}
