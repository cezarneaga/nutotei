import { NextSeo } from 'next-seo'
import Layout from 'components/layout'
import { Hero } from 'components/hero'
import { Latest } from 'components/latest'
import { LatestParty } from 'components/latest-party'
import { getCandidates, getCandidatesByParty } from '../lib/api'
import { Candidate } from '../lib/contentTypes'
import Script from 'next/script'
export default function IndexPage({
  preview,
  latestCandidates,
  psdCandidates,
  pnlCandidates,
  usrCandidates,
  aurCandidates,
  udmrCandidates,
  minoritatiCandidates,
  neafiliatiCandidates,
}: {
  preview: boolean
  latestCandidates: Candidate[]
  psdCandidates: Candidate[]
  pnlCandidates: Candidate[]
  usrCandidates: Candidate[]
  aurCandidates: Candidate[]
  udmrCandidates: Candidate[]
  minoritatiCandidates: Candidate[]
  neafiliatiCandidates: Candidate[]
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
          images: [{ url: 'https://integritatepebune.ro/images/nutotei.png' }],
        }}
      />
      <div className='bg-white'>
        <div className='mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24'>
          <div
            className='infogram-embed'
            data-id='e40976ae-691a-474d-a27a-bb8a121fde59'
            data-type='interactive'
            data-title='Raport 1 v6'
          ></div>
          <Script
            id=''
            dangerouslySetInnerHTML={{
              __html: `
                !function(e,i,n,s){var t="InfogramEmbeds",d=e.getElementsByTagName("script")[0];if(window[t]&&window[t].initialized)window[t].process&&window[t].process();else if(!e.getElementById(n)){var o=e.createElement("script");o.async=1,o.id=n,o.src="https://e.infogram.com/js/dist/embed-loader-min.js",d.parentNode.insertBefore(o,d)}}(document,0,"infogram-async");
              `,
            }}
          />
        </div>
      </div>
    </Layout>
  )
}
