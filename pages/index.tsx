import Layout from 'components/layout'
import { NextSeo } from 'next-seo'
import { Report, ReportDocument } from '../lib/contentTypes'

export default function IndexPage({
  preview
}: {
  preview: boolean
  reports: Report[]
  reportDocuments: ReportDocument[]
}) {
  return (
    <Layout preview={preview}>
      <NextSeo
        title={`Integritate pe bune`}
        description={`Pentru că impostura, nepotismul, nesimțirea și corupția sunt coloana vertebrală a clasei noastre politice. Și pentru că putem să îi schimbăm. Pentru că trebuie să o facem. Pentru că avem nevoie de decență, bun simț, meritocrație si oameni care au făcut ceva nu oameni care promit că vor face ceva în politică.`}
        canonical={`https://integritatepebune.ro`}
        openGraph={{
          url: `https://integritatepebune.ro`,
          title: `Integritate pe bune`,
          description: `Pentru că impostura, nepotismul, nesimțirea și corupția sunt coloana vertebrală a clasei noastre politice. Și pentru că putem să îi schimbăm. Pentru că trebuie să o facem. Pentru că avem nevoie de decență, bun simț, meritocrație si oameni care au făcut ceva nu oameni care promit că vor face ceva în politică.`,
          images: [{ url: 'https://integritatepebune.ro/images/profile.png' }],
        }}
      />

      <div className='flex justify-center' style={{ height: '60vh', marginTop: '1em' }}>
        <h5 style={{ fontSize: '5em', marginTop: '1.2em' }}>Integritate pe bune</h5>
      </div>

    </Layout >
  )
}

export async function getStaticProps({ preview = false }) {
  return {
    props: {
      preview,
    },
  }
}
