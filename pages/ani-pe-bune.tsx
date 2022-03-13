import { NextSeo } from 'next-seo'
import { splitAt } from 'ramda'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import useSWRInfinite from 'swr/infinite'
import Layout from 'components/layout'
import { LatestTicks } from 'components/latest-ticks'
import { CandidateCard } from 'components/candidate-card'
import { AniHeader } from 'components/ani-header'
import { getAnis, swrFetcher } from 'lib/api'
import { Candidate } from 'lib/contentTypes'
type Props = {
  latest: Candidate[]
  older: Candidate[]
  preview: boolean
  total: number
}
const limit = 6
export default function Candidat({ latest, older, total, preview }: Props) {
  const router = useRouter()

  const { data, error, size, setSize } = useSWRInfinite((index) => {
    return `{aniPeBuneCollection( order: sys_firstPublishedAt_DESC, limit: ${limit}, skip: ${index * limit + 6}) {
        items {
          sys {
            id
            firstPublishedAt
          }
          name
          slug
          review
          mainImage {
            url
            title
            width
            height
          }
        }
      }
    }`
  }, swrFetcher)
  if (!router.isFallback && !latest) {
    return <ErrorPage statusCode={404} />
  }
  const isLoadingInitialData = !data && !error
  const isSSR = typeof window === 'undefined'
  const isLoadingMore = !isSSR ? isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined') : false
  const candidates = data ? [].concat(...data) : []
  const isEmpty = data?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < limit)

  return (
    <Layout preview={preview}>
      {router.isFallback ? (
        <>Loading…</>
      ) : (
        <>
          <NextSeo
            title={`Integritate pe bune - Integritate pe bune`}
            description={`Ne-am adunat câțiva voluntari și o să încercăm să facem o cercetare, un fel de hartă a României căpușate. Despre cazurile cele mai  dure o să scriu în Libertatea. O să începem cu ministerele controlate de USRPLUS căci acolo sunt șansele cele mai mari să se întămple ceva.`}
            canonical={`https://integritatepebune.ro/ani-pe-bune`}
            openGraph={{
              url: `https://integritatepebune.ro/ani-pe-bune`,
              title: `Integritate pe bune - Integritate pe bune`,
              description: `Ne-am adunat câțiva voluntari și o să încercăm să facem o cercetare, un fel de hartă a României căpușate. Despre cazurile cele mai  dure o să scriu în Libertatea. O să începem cu ministerele controlate de USRPLUS căci acolo sunt șansele cele mai mari să se întămple ceva.`,
              images: latest?.map((ani) => ani.mainImage),
            }}
          />
          <AniHeader number={total} />
          <LatestTicks candidates={latest} type='dosar' />
          {older.length > 0 && (
            <div className='bg-white'>
              <div className='mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24'>
                <div className='grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8'>
                  <div className='space-y-5 sm:space-y-4'>
                    <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
                      {`Stai liniștit că mai sunt. Uite încă ${total - 4}!`}
                    </h2>
                    <p className='text-xl text-gray-500'>
                      Pe ei i-am analizat noi până acum. Dacă mai știi tu pe cineva, trimite-ne detalii!
                    </p>
                    <div className='mt-8 rounded-md shadow sm:mt-4 '>
                      <a
                        href='mailto:valeriu@nutotei.ro'
                        className='w-full md:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#f5c646] bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10'
                      >
                        Trimite-ne CV-uri
                      </a>
                    </div>
                  </div>
                  <div className='lg:col-span-2'>
                    <ul className='space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8'>
                      {older.map((candidate) => (
                        <CandidateCard candidate={candidate} type='capusa' key={candidate.sys.id} />
                      ))}
                      {candidates?.map((candidate: Candidate) => (
                        <CandidateCard candidate={candidate} type='capusa' key={candidate.sys.id} />
                      ))}
                    </ul>
                    <button
                      className='mt-12 w-full md:w-auto md:mx-auto flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-[#f5c646] border-red-600 hover:bg-gray-100 md:py-2 md:text-lg md:px-4'
                      disabled={typeof window !== 'undefined' ? isLoadingMore || isReachingEnd : true}
                      onClick={() => setSize(size + 1)}
                    >
                      {typeof window !== 'undefined'
                        ? isLoadingMore
                          ? 'se încarcă...'
                          : isReachingEnd
                          ? 'cam atât deocamdată'
                          : 'mai mulți'
                        : 'se încarcă...'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Layout>
  )
}
export async function getStaticProps({ preview = false }: { preview: boolean }) {
  const anis = await getAnis(6, preview)
  const [latest, older] = splitAt(4, anis)
  const total = anis.length
  return {
    props: {
      preview,
      latest,
      older,
      total,
    },
  }
}
