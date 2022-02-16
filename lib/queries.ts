export const operationsDoc = `
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
  query CandidatesTotalByParty($party: String!) {
    candidateCollection(where: {party: $party}, limit:4) {
      total
    }
  }

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
  query AllParties{
    candidateCollection(where: {party_exists: true}) {
      items {
        party
      }
    }
  }
  query PageQuery($slug: String!) {
    page: pageCollection(where: {slug: $slug}, limit: 1) {
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
  query County($id: String!) {
    county: countyCollection(where: {sys: {id: $id}}, limit: 1) {
      items {
        slug
        value
        label
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
export const ticksDoc = `
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
export const aniDoc = `
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
