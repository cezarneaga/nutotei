import Image from 'next/legacy/image'
import Link from 'next/link'
import { Candidate } from 'lib/contentTypes'
export function CandidateCard({ candidate, type }: { candidate: Candidate; type: string }) {
  return (
    <li>
      <div className='flex items-center space-x-4 lg:space-x-6'>
        <div className='w-16 h-16 lg:w-20 lg:h-20 '>
          <Link href={`/${type}/${candidate.slug}`} title={candidate.name}>
            <Image
              className='rounded-full object-cover'
              src={candidate.mainImage.url}
              alt={candidate.mainImage.title}
              width={80}
              height={80}
            />
          </Link>
        </div>

        <div className='font-medium text-lg leading-6 space-y-1 '>
          <h3>
            <Link href={`/${type}/${candidate.slug}`} title={candidate.name}>
              {candidate.name}
            </Link>
          </h3>
          <p className='text-[#f5c646] truncate'>{candidate.review.substring(0, 20)}...</p>
        </div>
      </div>
    </li>
  )
}
