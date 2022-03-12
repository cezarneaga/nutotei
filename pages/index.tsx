import { NextSeo } from 'next-seo'
import Layout from 'components/layout'
import { Hero } from 'components/hero'
import { Latest } from 'components/latest'
import { LatestParty } from 'components/latest-party'
import { getCandidates, getCandidatesByParty } from '../lib/api'
import { Candidate } from '../lib/contentTypes'
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
      <Hero />
      <Latest candidates={latestCandidates} />
      <LatestParty candidates={psdCandidates} slug='psd' />
      <LatestParty candidates={pnlCandidates} slug='pnl' />
      <LatestParty candidates={usrCandidates} slug='usr' />
      <LatestParty candidates={aurCandidates} slug='aur' />
      <LatestParty candidates={udmrCandidates} slug='udmr' />
      <LatestParty candidates={minoritatiCandidates} slug='minoritati' />
      <LatestParty candidates={neafiliatiCandidates} slug='neafiliati' />
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const latestCandidates = await getCandidates(4, preview)
  const psdCandidates = await getCandidatesByParty('PSD', 6, preview)
  const pnlCandidates = await getCandidatesByParty('PNL', 6, preview)
  const usrCandidates = await getCandidatesByParty('USR', 4, preview)
  const aurCandidates = await getCandidatesByParty('AUR', 4, preview)
  const udmrCandidates = await getCandidatesByParty('UDMR', 4, preview)
  const minoritatiCandidates = await getCandidatesByParty('Minorități', 4, preview)
  const neafiliatiCandidates = await getCandidatesByParty('Neafiliați', 4, preview)
  return {
    props: {
      preview,
      latestCandidates,
      psdCandidates,
      pnlCandidates,
      usrCandidates,
      aurCandidates,
      udmrCandidates,
      minoritatiCandidates,
      neafiliatiCandidates,
    },
  }
}
