import { NextSeo } from 'next-seo'
import Layout from 'components/layout'
import { ReportLoader } from 'components/report-loader'
import { getReports } from '../lib/api'
import { Report } from '../lib/contentTypes'

export default function IndexPage({ preview, reports }: { preview: boolean; reports: Report[] }) {
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
      <div className='bg-white'>
        <div className='mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24'>
          {reports.map((report) => (
            <ReportLoader report={report} key={report.sys.id} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const reports: Report[] = await getReports(6)

  return {
    props: {
      preview,
      reports,
    },
  }
}
