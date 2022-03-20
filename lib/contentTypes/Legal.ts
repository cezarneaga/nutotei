import { Image, RichText } from './generic'

export interface Legal {
  sys: {
    id: string
    publishedAt: string
    firstPublishedAt: string
  }
  name: string
  slug: string
  policy: RichText
}
