import { Url } from 'url'

export interface ReportDocument {
  sys: {
    id: string
    publishedAt: string
    firstPublishedAt: string
  }
  name: string
  document: {
    title: string
    description: string
    fileName: string
    size: number
    url: string
  }
}
