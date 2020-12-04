import counties from "./counties.json"

export const getCountyCodeBySlug = (slug: string) => {
  const foundCounty = counties.find((item) => item.slug === slug)
  return foundCounty ? foundCounty.value : null
}

export const getCountyNameByCountyCode = (countyCode: string) => {
  const foundCounty = counties.find((item) => item.value === countyCode)
  return foundCounty ? foundCounty.label : null
}
