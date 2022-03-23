import { NextSeo } from 'next-seo'
import Layout from 'components/layout'

import { getPage } from '../lib/api'
import { Page } from '../lib/contentTypes'

export default function IndexPage({ preview, page }: { preview: boolean; page: Page }) {
  return (
    <Layout preview={preview}>
      <NextSeo
        title={`${page?.title} - Integritate pe bune`}
        description={`${page?.subtitle}`}
        canonical={`https://integritatepebune.ro/${page?.slug}`}
        openGraph={{
          url: `https://integritatepebune.ro/${page?.slug}`,
          title: `${page?.title} - Integritate pe bune`,
          description: `${page?.subtitle}`,
          images: [page?.photo],
        }}
      />
      <div className='bg-white'>
        <div className='flex justify-center mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24'>
          <iframe
            src='https://docs.google.com/forms/d/e/1FAIpQLSc5Nh-PcJ9VMKB06NyNABq4H4OzK3-j-FFPmaQvyqyvZEfI1Q/viewform?embedded=true'
            width='640'
            height='4046'
            frameBorder='0'
          >
            Loading…
          </iframe>
        </div>
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
