import { operationsDoc } from "lib/queries";
const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const publicToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const previewToken = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN;

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
  );
  const json = await result.json();

  if (!!json.errors) {
    console.warn(
      `Errors in GraphQL query ${operationName}:`,
      json.errors.map((m: any) => m.message)
    );
  }

  return json;
}
export function extractProject(fetchResponse: { data: any }) {
  return fetchResponse?.data?.projectCollection?.items?.[0] || null;
}

export function extractProjectEntries(fetchResponse: { data: any }) {
  return fetchResponse?.data?.projectCollection?.items || [];
}

export async function getProjects(limit: number, preview: boolean) {
  const entries = await fetchGraphQL(
    operationsDoc,
    "ProjectList",
    { limit },
    preview
  );
  return extractProjectEntries(entries);
}
export async function getProjectBySlug(
  slug: string,
  limit: number,
  preview: boolean
) {
  const entry = await fetchGraphQL(
    operationsDoc,
    "ProjectBySlug",
    { slug, preview },
    preview
  );
  const entries = await fetchGraphQL(
    operationsDoc,
    "MoreProjects",
    { slug, limit },
    preview
  );
  return {
    project: extractProject(entry),
    moreProjects: extractProjectEntries(entries),
  };
}
export async function getAllProjectsWithSlugs() {
  const entries = await fetchGraphQL(operationsDoc, "AllProjectsWithSlugs");
  return extractProjectEntries(entries);
}
export async function getPreviewProjectBySlug(slug: string) {
  const entry = await fetchGraphQL(
    operationsDoc,
    "ProjectBySlug",
    {
      slug,
      preview: true,
    },
    true
  );
  return extractProject(entry);
}
