import { Candidate } from 'lib/contentTypes'
import { CandidateCard } from 'components/candidate-card'

import { parties } from 'lib/parties'
export function LatestParty({ slug, candidates }: { slug: string; candidates: Candidate[] }) {
  const party = parties?.find((party) => party.slug === slug)!
  return (
    <div className='bg-white'>
      <div className='mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8'>
          <div className='space-y-5 sm:space-y-4'>
            <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>Luați de la {party.partyShort}</h2>
            <h3 className='text-1xl font-extrabold tracking-tight sm:text-2xl'>{party.party}</h3>
            <p className='text-xl text-gray-500'>Nici unii nici alții nu-s mai breji. Unde-i bine, se adună însă mulți.</p>
          </div>
          <div className='lg:col-span-2'>
            <ul className='space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8'>
              {candidates.map((candidate) => (
                <CandidateCard candidate={candidate} key={candidate.sys.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
