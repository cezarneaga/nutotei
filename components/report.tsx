import Script from 'next/script'
import Link from 'next/link'
import { Report } from 'lib/contentTypes'

export function ReportsTOC({ reports }: { reports: Report[] }) {
  return (
    <div className='py-12 px-4'>
      {reports.map((report) => (
        <ReportLink report={report} key={report.sys.id} />
      ))}
    </div>
  )
}

export function ReportsLoader({ reports }: { reports: Report[] }) {
  return (
    <div>
      {reports.map((report) => (
        <ReportLoader report={report} key={report.sys.id} />
      ))}
    </div>
  )
}

function ReportLink({ report }: { report: Report }) {
  return (
    <div className='mt-1 text-2xl font-bold sm:text-3xl sm:tracking-tight lg:text-4xl text-center' style={{ color: '#4278b3' }}>
      <Link href={`#${ReportHref(report)}`}>
        <a title={report.name}>{report.name}</a>
      </Link>
    </div>
  )
}

function ReportLoader({ report }: { report: Report }) {
  return (
    <div id={ReportHref(report)} className='bg-white'>
      <div className='infogram-embed' data-id={report.id} data-type='interactive' data-title={report.name} />
      <Script
        id=''
        dangerouslySetInnerHTML={{
          __html: `
            !function(e,i,n,s){var t="InfogramEmbeds",d=e.getElementsByTagName("script")[0];if(window[t]&&window[t].initialized)window[t].process&&window[t].process();else if(!e.getElementById(n)){var o=e.createElement("script");o.async=1,o.id=n,o.src="https://e.infogram.com/js/dist/embed-loader-min.js",d.parentNode.insertBefore(o,d)}}(document,0,"infogram-async");
          `,
        }}
      />
    </div>
  )
}

function ReportHref(report: Report) {
  return encodeURI(report.name?.toLowerCase().replaceAll(' ', '-'))
}
