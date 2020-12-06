import counties from './counties.json'

export const getCountyCodeBySlug = (slug: string | null) => {
  const foundCounty = counties.find((item) => item.slug === slug)
  return foundCounty ? foundCounty.value : null
}

export const getCountyNameByCountyCode = (countyCode: string | null) => {
  const foundCounty = counties.find((item) => item.value === countyCode)
  return foundCounty ? foundCounty.label : null
}
