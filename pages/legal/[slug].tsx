import { NextSeo } from 'next-seo'

import { getLegalBySlug, getAllLegalsWithSlugs } from 'lib/api'
import { Legal } from 'lib/contentTypes'

import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from 'components/layout'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default function Candidat({ legal, preview }: { legal: Legal; preview: boolean }) {
  const router = useRouter()

  if (!router.isFallback && !legal) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      {router.isFallback ? (
        <>Loading…</>
      ) : (
        <>
          <NextSeo
            title={`${legal?.name} - Integritate pe bune`}
            canonical={`https://integritatepebune.ro/legal/${legal?.slug}`}
            openGraph={{
              url: `https://integritatepebune.ro/legal/${legal?.slug}`,
              title: `${legal?.name} - Integritate pe bune`,
            }}
          />
          <div className='bg-white'>
            <div className='mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24'>
              <h3 className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>{legal.name}</h3>
              <div className='mt-8 lg:mt-0'>
                <div className='text-base max-w-prose mx-auto lg:max-w-none'>
                  <strong className='text-lg text-gray-500'>
                    Ultima actualizare {new Date(legal.sys.publishedAt).toLocaleDateString('ro-RO')}
                  </strong>
                </div>
                <div className='mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1'>
                  {legal.policy?.json && documentToReactComponents(legal.policy?.json)}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps({
  params,
  preview = false,
}: {
  params: { slug: string; secret: string }
  preview: boolean
}) {
  const { slug } = params
  const legal = await getLegalBySlug(slug)

  return {
    props: {
      preview,
      legal,
    },
  }
}

export async function getStaticPaths() {
  const legals: Legal[] = await getAllLegalsWithSlugs()
  return {
    paths: legals?.map(({ slug }) => `/legal/${slug}`),
    fallback: true,
  }
}
