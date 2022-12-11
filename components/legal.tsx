import Link from 'next/link'
import { Legal } from 'lib/contentTypes'

export function LegalsLoader({ legals }: { legals: Legal[] }) {
  return (
    <div>
      {legals?.map((legal, index) => (
        <LegalLoader legal={legal} index={index} key={legal.sys.id} />
      ))}
    </div>
  )
}

function LegalLoader({ legal, index }: { legal: Legal; index: number }) {
  return (
    <span>
      {index > 0 && <span> | </span>}
      <Link href={`/legal/${legal.slug}`} title={legal.name} style={{ color: '#4278b3' }}>
        {legal.name}
      </Link>
    </span>
  )
}
