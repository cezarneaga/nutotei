import { ReactElement } from 'react'
import { Nav } from 'components/nav'
import { Footer } from 'components/footer'

import useSWRInfinite from 'swr/infinite'
import { swrFetcher } from 'lib/api'

export default function Layout({ preview, children }: { preview: boolean; children: ReactElement | ReactElement[] }) {
  const legalFetcher = async (query: string) => {
    const data = await swrFetcher(query)
    return await data.legalCollection.items
  }

  const { data, error, size, setSize } = useSWRInfinite((index) => {
    return `{
      legalCollection(where: { slug_exists: true }, order: order_ASC) {
        items {
          sys {
            id
          }
          name
          slug
        }
      }
    }`
  }, legalFetcher)

  const legals = data ? [].concat(...data) : []

  return (
    <>
      <div className='container'>
        <Nav />
        {children}
        <Footer legals={legals} />
      </div>
    </>
  )
}
