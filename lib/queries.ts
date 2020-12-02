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
  fragment imageUrl on Candidate {
    mainImage {
      url
      title
      width
      height
    }
  }
`;
