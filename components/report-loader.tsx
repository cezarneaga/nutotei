import Script from 'next/script'
import { Report } from 'lib/contentTypes'

export function ReportLoader({ report }: { report: Report }) {
  return (
    <div className='bg-white'>
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
