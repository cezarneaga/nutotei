import Layout from 'components/layout'
import Image from 'next/image'
import { ReactNode } from 'react'
import { NextSeo } from 'next-seo'
import { BLOCKS, MARKS, Block, Inline } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { getPage } from '../lib/api'
import { Page } from '../lib/contentTypes'
const Bold = ({ children }: { children: ReactNode }) => <strong>{children}</strong>
const Text = ({ children }: { children: ReactNode }) => <p className='pt-2'>{children}</p>
const options = {
  renderMark: {
    [MARKS.BOLD]: (text: ReactNode) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: ReactNode) => <Text>{children}</Text>,
  },
}
export default function IndexPage({ preview, page }: { preview: boolean; page: Page }) {
  return (
    <Layout preview={preview}>
      <NextSeo
        title={`${page?.title} - Integritate pe bune`}
        description={`${page?.subtitle}`}
        canonical={`https://nutotei.ro/${page?.slug}`}
        openGraph={{
          url: `https://nutotei.ro/${page?.slug}`,
          title: `${page?.title} - Integritate pe bune`,
          description: `${page?.subtitle}`,
          images: [page?.photo],
        }}
      />
      <div className=''>
        <main className='lg:relative'>
          <div className='mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left'>
            <div className='px-4 lg:w-1/2 sm:px-8 xl:pr-16'>
              <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl'>
                <span className='block xl:inline'>{page?.title}</span>
              </h1>
              <strong className='mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl'>
                {page?.subtitle}
              </strong>
              <p className='mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl'>
                {documentToReactComponents(page.content.json, options)}
              </p>
              <div className='mt-10 sm:flex sm:justify-center lg:justify-start'>
                <div className='rounded-md shadow'>
                  <a
                    href='https://www.facebook.com/Integritatepebune'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-2 md:text-lg md:px-5'
                  >
                    Facebook
                  </a>
                </div>
                <div className='mt-3 rounded-md shadow sm:mt-0 sm:ml-3'>
                  <a
                    href='mailto:valeriu@nutotei.ro'
                    className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-2 md:text-lg md:px-5'
                  >
                    Scrie-mi
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full'>
            <Image
              className='absolute inset-0 w-full h-full object-cover'
              src={page?.photo.url}
              alt={page?.photo.title}
              width={page?.photo.width || 600}
              height={page?.photo.height || 600}
              layout='responsive'
            />
          </div>
        </main>
      </div>
    </Layout>
  )
}
export async function getStaticProps({ preview = false }) {
  const page = await getPage('despre', preview)

  return {
    props: {
      preview,
      page,
    },
  }
}
