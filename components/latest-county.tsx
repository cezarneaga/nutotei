import { Candidate } from 'lib/contentTypes'
import { CandidateCardBig } from 'components/candidate-card-big'

export function LatestCounty({ candidates, countyName }: { candidates: Candidate[]; countyName: string | null }) {
  return (
    <div className='bg-white'>
      <div className='mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-16'>
        <div className='space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0'>
          <div className='space-y-5 sm:space-y-4'>
            <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
              Politruci din <span className='text-red-600 inline'>{countyName}</span>
            </h2>
            <p className='text-xl text-gray-500'>
              E important să știm pe cine votăm la noi acasă. Chiar fiind bine intenționați, putem promova oameni pe care nu îi
              vrem.
            </p>
          </div>
          <div className='lg:col-span-2'>
            <ul className='space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8'>
              {candidates.map((candidate) => (
                <CandidateCardBig candidate={candidate} key={candidate.sys.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
