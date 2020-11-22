export const operationsDoc = `
  query ProjectList($limit: Int!) {
    projectCollection(limit: $limit) {
      items {
        sys{
          id
          publishedAt
          firstPublishedAt
        }
        title
        description
        slug
        stack
        image {
          url
          fileName
          title
          width
          height
        }
      }
    }
  }
`;
