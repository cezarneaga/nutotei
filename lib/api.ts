import { GraphQLClient } from 'graphql-request'
import {
  candidateListDoc,
  candidateBySlugDoc,
  moreCandidatesDoc,
  candidatesByCountyDoc,
  candidatesByPartyDoc,
  candidatesTotalByPartyDoc,
  allCandidatesWithSlugDoc,
  allPartiesDoc,
  countyDoc,
  allTicksBySlugDoc,
  tickListDoc,
  tickBySlugDoc,
  moreTicksDoc,
  allAniBySlugDoc,
  aniListDoc,
  aniBySlugDoc,
  moreAniDoc,
  aniByPartyDoc,
  aniTotalByPartyDoc,
  pageDoc,
  // reportsDoc,
  getReportsDoc,
  legalDoc,
  allLegalsDoc,
} from 'lib/queries'

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
  return await graphQLClient.request(query)
}
export const candidatesFetcher = async (query: string) => {
  const data = await swrFetcher(query)
  return await data.candidateCollection.items
}

export async function fetchGraphQL(
  query: string,
  operationName: string,
  variables?: { [key: string]: string | number | boolean },
  preview?: boolean
) {
  const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${space}`

  const accessToken = preview ? previewToken : publicToken

  const fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
      operationName: operationName,
    }),
  }

  const fetchResult = await fetch(fetchUrl, fetchOptions)
  const json = await fetchResult.json()

  if (!!json.errors) {
    console.warn(
      `\nErrors in GraphQL query ${operationName}:`,
      json.errors.map((err: any) => err.message)
    )
  }

  return json
}
export function extractCounty(fetchResponse: { data: any }) {
  return fetchResponse?.data?.county?.items?.[0] || null
}
export function extractCandidate(fetchResponse: { data: any }) {
  return fetchResponse?.data?.candidateCollection?.items?.[0] || null
}
export function extractCandidateEntries(fetchResponse: { data: any }) {
  return fetchResponse?.data?.candidateCollection?.items || []
}
export function extractTick(fetchResponse: { data: any }) {
  return fetchResponse?.data?.tickCollection?.items?.[0] || null
}
export function extractAni(fetchResponse: { data: any }) {
  return fetchResponse?.data?.aniPeBuneCollection?.items?.[0] || null
}
export function extractTickEntries(fetchResponse: { data: any }) {
  return fetchResponse?.data?.tickCollection?.items || []
}
export function extractAniEntries(fetchResponse: { data: any }) {
  return fetchResponse?.data?.aniPeBuneCollection?.items || []
}
export async function getTicks(limit: number, preview: boolean) {
  const entries = await fetchGraphQL(tickListDoc, 'TicksList', { limit }, preview)
  return extractTickEntries(entries)
}
export async function getAnis(limit: number, preview: boolean) {
  const entries = await fetchGraphQL(aniListDoc, 'AniList', { limit }, preview)
  return extractAniEntries(entries)
}
export async function getTickBySlug(slug: string, limit: number, preview: boolean) {
  const entry = await fetchGraphQL(tickBySlugDoc, 'TickBySlug', { slug, preview }, preview)
  const entries = await fetchGraphQL(moreTicksDoc, 'MoreTicks', { slug, limit }, preview)
  return {
    tick: extractTick(entry),
    moreTicks: extractTickEntries(entries),
  }
}
export async function getAniBySlug(slug: string, limit: number, preview: boolean) {
  const entry = await fetchGraphQL(aniBySlugDoc, 'AniBySlug', { slug, preview }, preview)
  const entries = await fetchGraphQL(moreAniDoc, 'MoreAni', { slug, limit }, preview)
  return {
    ani: extractAni(entry),
    moreAnis: extractAniEntries(entries),
  }
}
export async function getAllTicksWithSlugs() {
  const entries = await fetchGraphQL(allTicksBySlugDoc, 'AllTicksWithSlugs')
  return extractTickEntries(entries)
}
export async function getAllAniWithSlugs() {
  const entries = await fetchGraphQL(allAniBySlugDoc, 'AllAniWithSlugs')
  return extractAniEntries(entries)
}
export async function getPage(slug: string, preview: boolean) {
  const { data } = await fetchGraphQL(pageDoc, 'PageQuery', { slug }, preview)
  return data?.page?.items[0] || []
}
export async function getCandidates(limit: number, preview: boolean) {
  const entries = await fetchGraphQL(candidateListDoc, 'CandidateList', { limit }, preview)
  return extractCandidateEntries(entries)
}
export async function getCandidatesByCounty(countyCode: string | null) {
  const entries = await fetchGraphQL(candidatesByCountyDoc, 'CandidatesByCounty', {
    county: countyCode || '',
  })
  return extractCandidateEntries(entries)
}
export async function getCandidatesByParty(party: string, limit: number, preview: boolean) {
  const entries = await fetchGraphQL(candidatesByPartyDoc, 'CandidatesByParty', { party, limit, preview }, preview)
  return extractCandidateEntries(entries)
}
export async function getCandidatesTotalByParty(party: string) {
  const { data } = await fetchGraphQL(candidatesTotalByPartyDoc, 'CandidatesTotalByParty', {
    party,
  })
  return data?.candidateCollection?.total || 0
}
export async function getCandidateBySlug(slug: string, limit: number, preview: boolean) {
  const entry = await fetchGraphQL(candidateBySlugDoc, 'CandidateBySlug', { slug, preview }, preview)
  const entries = await fetchGraphQL(moreCandidatesDoc, 'MoreCandidates', { slug, limit }, preview)
  return {
    candidate: extractCandidate(entry),
    moreCandidates: extractCandidateEntries(entries),
  }
}
export async function getAllCandidatesWithSlugs() {
  const entries = await fetchGraphQL(allCandidatesWithSlugDoc, 'AllCandidatesWithSlugs')
  return extractCandidateEntries(entries)
}
export async function getPreviewProjectBySlug(slug: string) {
  const entry = await fetchGraphQL(
    candidateBySlugDoc,
    'CandidateBySlug',
    {
      slug,
    },
    true
  )
  return extractCandidate(entry)
}
export async function getCountyById(id: string) {
  const entry = await fetchGraphQL(countyDoc, 'County', { id }, true)
  return extractCounty(entry)
}
export async function getAniByParty(party: string, limit: number, preview: boolean) {
  const entries = await fetchGraphQL(aniByPartyDoc, 'AniByParty', { party, limit, preview }, preview)
  return extractAniEntries(entries)
}
export async function getAniTotalByParty(party: string) {
  const { data } = await fetchGraphQL(aniTotalByPartyDoc, 'AniTotalByParty', { party })
  return data?.aniPeBuneCollection?.total || 0
}

export async function getReports(year: number) {
  const entries = await fetchGraphQL(getReportsDoc(year), 'Reports')
  const reports = extractReports(entries);
  return extractReports(entries)
}

export function extractReports(fetchResponse: { data: any }) {
  return fetchResponse?.data?.reportCollection?.items || []
}
export async function getReportDocuments(year: number) {
  const entries = await fetchGraphQL(getReportsDoc(year), 'ReportDocuments')
  return extractReportDocuments(entries)
}
export function extractReportDocuments(fetchResponse: { data: any }) {
  return fetchResponse?.data?.reportDocumentCollection?.items || []
}
export async function getLegalBySlug(slug: string) {
  const entry = await fetchGraphQL(legalDoc, 'LegalBySlug', { slug })
  return extractLegal(entry)
}
export function extractLegal(fetchResponse: { data: any }) {
  return fetchResponse?.data?.legalCollection?.items?.[0] || null
}
export async function getAllLegalsWithSlugs() {
  const entries = await fetchGraphQL(allLegalsDoc, 'AllLegalsWithSlugs')
  return extractLegalEntries(entries)
}
export function extractLegalEntries(fetchResponse: { data: any }) {
  return fetchResponse?.data?.legalCollection?.items || []
}
