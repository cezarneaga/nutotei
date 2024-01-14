export const candidateListDoc = `
query CandidateList($limit: Int!) {
  candidateCollection(limit: $limit,order:sys_firstPublishedAt_DESC) {
    items {
      sys {
        id
        firstPublishedAt
      }
      name
      slug
      review
      ...imageUrl
      documentsCollection {
        items {
          title
          description
          fileName
          size
          url
        }
      }
      party
      facebookLink
    }
  }
}
fragment imageUrl on Candidate {
  mainImage {
    url
    title
    width
    height
  }
}
`
export const candidateBySlugDoc = `
query CandidateBySlug($slug: String!, $preview: Boolean!) {
  candidateCollection(limit: 1, where: {slug: $slug}, preview: $preview) {
    items {
      sys {
        id
        firstPublishedAt
      }
      name
      slug
      review
      ...imageUrl
      content{
        json
      }
      documentsCollection {
        items {
          title
          description
          fileName
          size
          url
        }
      }
      party
      facebookLink
    }
  }
}
fragment imageUrl on Candidate {
  mainImage {
    url
    title
    width
    height
  }
}
`
export const moreCandidatesDoc = `
query MoreCandidates($slug: String!, $limit: Int!) {
  candidateCollection(
    where: { slug_not_in: [$slug] }
    order: sys_firstPublishedAt_DESC
    limit: $limit
  ) {
    items {
      sys {
        id
        firstPublishedAt
      }
      name
      slug
      review
      party
      ...imageUrl
    }
  }
}
fragment imageUrl on Candidate {
  mainImage {
    url
    title
    width
    height
  }
}
`
export const candidatesByCountyDoc = `
query CandidatesByCounty($county: String!) {
  candidateCollection( where: {county: {value: $county}} order: sys_firstPublishedAt_DESC limit: 30) {
    items {
      sys {
        id
      }
      name
      slug
      review
      party
      ...imageUrl
      county {
        value
        label
        slug
      }
    }
  }
}
fragment imageUrl on Candidate {
  mainImage {
    url
    title
    width
    height
  }
}
`
export const candidatesByPartyDoc = `
query CandidatesByParty($party: String!, $limit: Int!) {
  candidateCollection(where: { party: $party }, order: sys_firstPublishedAt_DESC, limit: $limit) {
    items {
      sys {
        id
      }
      name
      slug
      review
      ...imageUrl
    }
  }
}
fragment imageUrl on Candidate {
  mainImage {
    url
    title
    width
    height
  }
}
`
export const candidatesTotalByPartyDoc = `
query CandidatesTotalByParty($party: String!) {
  candidateCollection(where: {party: $party}, limit:4) {
    total
  }
}
`
export const allCandidatesWithSlugDoc = `
query AllCandidatesWithSlugs {
  candidateCollection(
    where: { slug_exists: true }
    order: sys_firstPublishedAt_DESC
  ) {
    items {
      slug
    }
  }
}
`
export const allPartiesDoc = `
query AllParties{
  candidateCollection(where: {party_exists: true}) {
    items {
      party
    }
  }
}
`
export const countyDoc = `
query County($id: String!) {
  county: countyCollection(where: {sys: {id: $id}}, limit: 1) {
    items {
      slug
      value
      label
    }
  }
}
`
export const allTicksBySlugDoc = `
query AllTicksWithSlugs {
  tickCollection(
    where: { slug_exists: true }
    order: sys_firstPublishedAt_DESC
  ) {
    items {
      slug
    }
  }
}
`
export const tickListDoc = `
query TicksList($limit: Int!) {
  tickCollection(limit: $limit,order:sys_firstPublishedAt_DESC) {
    items {
      sys {
        id
        firstPublishedAt
      }
      name
      slug
      review
      ...photoUrl
      documentsCollection {
        items {
          title
          description
          fileName
          size
          url
        }
      }
      party
      facebookLink
    }
  }
}
fragment photoUrl on Tick{
  mainImage {
    url
    title
    width
    height
  }
}
`
export const tickBySlugDoc = `
query TickBySlug($slug: String!, $preview: Boolean!) {
  tickCollection(limit: 1, where: {slug: $slug}, preview: $preview) {
    items {
      sys {
        id
        firstPublishedAt
      }
      name
      slug
      review
      ...photoUrl
      content {
        json
      }
      documentsCollection {
        items {
          title
          description
          fileName
          size
          url
        }
      }
      party
      facebookLink
    }
  }
}
fragment photoUrl on Tick{
  mainImage {
    url
    title
    width
    height
  }
}
`
export const moreTicksDoc = `
query MoreTicks($slug: String!, $limit: Int!) {
  tickCollection(where: {slug_not_in: [$slug]}, order: sys_firstPublishedAt_DESC, limit: $limit) {
    items {
      sys {
        id
        firstPublishedAt
      }
      name
      slug
      review
      party
      ...photoUrl
    }
  }
}
fragment photoUrl on Tick{
  mainImage {
    url
    title
    width
    height
  }
}
`
export const allAniBySlugDoc = `
query AllAniWithSlugs {
  aniPeBuneCollection(
    where: { slug_exists: true }
    order: sys_firstPublishedAt_DESC
  ) {
    items {
      slug
    }
  }
}
`
export const aniListDoc = `
query AniList($limit: Int!) {
  aniPeBuneCollection(limit: $limit,order:sys_firstPublishedAt_DESC) {
    items {
      sys {
        id
        firstPublishedAt
      }
      name
      slug
      review
      ...photoUrl
      documentsCollection {
        items {
          title
          description
          fileName
          size
          url
        }
      }
      party
      facebookLink
    }
  }
}
fragment photoUrl on AniPeBune{
  mainImage {
    url
    title
    width
    height
  }
}
`
export const aniBySlugDoc = `
query AniBySlug($slug: String!, $preview: Boolean!) {
  aniPeBuneCollection(limit: 1, where: {slug: $slug}, preview: $preview) {
    items {
      sys {
        id
        firstPublishedAt
      }
      name
      slug
      review
      ...photoUrl
      content {
        json
      }
      documentsCollection {
        items {
          title
          description
          fileName
          size
          url
        }
      }
      party
      facebookLink
    }
  }
}
fragment photoUrl on AniPeBune{
  mainImage {
    url
    title
    width
    height
  }
}
`
export const moreAniDoc = `
query MoreAni($slug: String!, $limit: Int!) {
  aniPeBuneCollection(where: {slug_not_in: [$slug]}, order: sys_firstPublishedAt_DESC, limit: $limit) {
    items {
      sys {
        id
        firstPublishedAt
      }
      name
      slug
      review
      party
      ...photoUrl
    }
  }
}
fragment photoUrl on AniPeBune{
  mainImage {
    url
    title
    width
    height
  }
}
`
export const aniByPartyDoc = `
query AniByParty($party: String!, $limit: Int!) {
  aniPeBuneCollection(where: { party: $party }, order: sys_firstPublishedAt_DESC, limit: $limit) {
    items {
      sys {
        id
        publishedAt
        firstPublishedAt
      }
      name
      slug
      review
      ...photoUrl
      content {
        json
      }
      documentsCollection {
        items {
          title
          description
          fileName
          size
          url
        }
      }
      party
      facebookLink
      }
  }
}
fragment photoUrl on AniPeBune{
  mainImage {
    url
    title
    width
    height
  }
}
`
export const aniTotalByPartyDoc = `
query AniTotalByParty($party: String!) {
  aniPeBuneCollection(where: {party: $party}, limit: 4) {
    total
  }
}
`

export function getReportsDoc(year: number): string {
  return `
query Reports {
  reportCollection(where: {year: ${year}}, order: order_ASC) {
    items {
      sys {
        id
        publishedAt
        firstPublishedAt
      }
      id
      name
      order
    }
  }
}
query ReportDocuments {
  reportDocumentCollection {
    items {
      sys {
        id
        publishedAt
        firstPublishedAt
      }
      name
      document {
        title
        description
        fileName
        size
        url
      }
    }
  }
}
`
}
// `
// query Reports {
//   reportCollection(filter: ${}, order: order_ASC) {
//     items {
//       sys {
//         id
//         publishedAt
//         firstPublishedAt
//       }
//       id
//       name
//       order
//     }
//   }
// }
// query ReportDocuments {
//   reportDocumentCollection {
//     items {
//       sys {
//         id
//         publishedAt
//         firstPublishedAt
//       }
//       name
//       document {
//         title
//         description
//         fileName
//         size
//         url
//       }
//     }
//   }
// }
// `
export const pageDoc = `
query PageQuery($slug: String!) {
  page: pageCollection(where: {slug: $slug}) {
    items {
      slug
      photo {
        url
        title
        width
        height
      }
      content {
        json
      }
      subtitle
      title
    }
  }
}
`
export const legalDoc = `
query LegalBySlug($slug: String!) {
  legalCollection(where: {slug: $slug}) {
    items {
      sys {
        id
        publishedAt
        firstPublishedAt
      }
      name
      slug
      policy {
        json
      }
    }
  }
}
`
export const allLegalsDoc = `
query AllLegalsWithSlugs {
  legalCollection(where: { slug_exists: true }, order: order_ASC) {
    items {
      slug
    }
  }
}
`
