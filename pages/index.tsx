import { NextSeo } from 'next-seo'
import Layout from 'components/layout'
import { ReportsTOC, ReportsLoader } from 'components/report'
import { getReports, getReportDocuments } from '../lib/api'
import { Report, ReportDocument } from '../lib/contentTypes'

export default function IndexPage({
  preview,
  reports,
  reportDocuments,
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
      <div className='bg-white'>
        <div className='mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24'>
          <div className='mt-1 text-4xl font-bold sm:text-5xl sm:tracking-tight lg:text-6xl text-center'>
            <a
              id='report-pdf'
              href={reportDocuments[0].document.url}
              target='_blank'
              title='Descarcă raportul în format PDF'
              rel='noopener noreferrer'
              style={{ color: '#4278b3' }}
            >
              <p>Descarcă raportul</p>
            </a>
          </div>
          <ReportsTOC reports={reports} />
          <ReportsLoader reports={reports} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const reports: Report[] = await getReports()
  const reportDocuments: ReportDocument[] = await getReportDocuments()

  return {
    props: {
      preview,
      reports,
      reportDocuments,
    },
  }
}
