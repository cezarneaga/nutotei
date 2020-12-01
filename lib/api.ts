import { operationsDoc } from "lib/queries"
import { GraphQLClient } from "graphql-request"

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const publicToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
const previewToken = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
export const swrFetcher = async (query: string) => {
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${space}`

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${publicToken}`,
    },
  })
  const data = await graphQLClient.request(query)
  return await data.candidateCollection.items
}
export async function fetchGraphQL(
  query: string,
  operationName: string,
  variables?: { [key: string]: string | number | boolean },
  preview?: boolean
) {
  const result = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${space}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${preview ? previewToken : publicToken}`,
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
        operationName: operationName,
      }),
    }
  )
  const json = await result.json()

  if (!!json.errors) {
    console.warn(
      `Errors in GraphQL query ${operationName}:`,
      json.errors.map((m: any) => m.message)
    )
  }

  return json
}
export function extractCandidate(fetchResponse: { data: any }) {
  return fetchResponse?.data?.candidateCollection?.items?.[0] || null
}

export function extractCandidateEntries(fetchResponse: { data: any }) {
  return fetchResponse?.data?.candidateCollection?.items || []
}

export async function getPage(slug: string, preview: boolean) {
  const { data } = await fetchGraphQL(
    operationsDoc,
    "PageQuery",
    { slug },
    preview
  )

  return data?.page.items[0]
}
export async function getCandidates(limit: number, preview: boolean) {
  const entries = await fetchGraphQL(
    operationsDoc,
    "CandidateList",
    { limit },
    preview
  )
  return extractCandidateEntries(entries)
}
export async function getCandidatesByCounty(county: string, preview: boolean) {
  const entries = await fetchGraphQL(
    operationsDoc,
    "CandidateList",
    { preview, limit: 10 },
    preview
  )
  return extractCandidateEntries(entries)
}

export async function getCandidatesByParty(
  party: string,
  limit: number,
  preview: boolean
) {
  const entries = await fetchGraphQL(
    operationsDoc,
    "CandidatesByParty",
    { party, limit, preview },
    preview
  )
  return extractCandidateEntries(entries)
}
export async function getCandidatesTotalByParty(party: string) {
  const { data } = await fetchGraphQL(operationsDoc, "CandidatesTotalByParty", {
    party,
  })

  return data?.candidateCollection?.total || 0
}

export async function getCandidateBySlug(
  slug: string,
  limit: number,
  preview: boolean
) {
  const entry = await fetchGraphQL(
    operationsDoc,
    "CandidateBySlug",
    { slug, preview },
    preview
  )
  const entries = await fetchGraphQL(
    operationsDoc,
    "MoreCandidates",
    { slug, limit },
    preview
  )
  return {
    candidate: extractCandidate(entry),
    moreCandidates: extractCandidateEntries(entries),
  }
}
export async function getAllCandidatesWithSlugs() {
  const entries = await fetchGraphQL(operationsDoc, "AllCandidatesWithSlugs")
  return extractCandidateEntries(entries)
}
export async function getPreviewProjectBySlug(slug: string) {
  const entry = await fetchGraphQL(
    operationsDoc,
    "CandidateBySlug",
    {
      slug,
      preview: true,
    },
    true
  )
  return extractCandidate(entry)
}
