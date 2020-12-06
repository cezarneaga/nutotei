export interface Party {
  partyShort: string
  party: string
  slug: string
}
export const parties: Party[] = [
  {
    partyShort: 'PSD',
    party: 'Partidul Social Democrat',
    slug: 'psd',
  },
  {
    partyShort: 'PNL',
    party: 'Partidul Național Liberal',
    slug: 'pnl',
  },
  {
    partyShort: 'PMP',
    party: 'Partidul Mișcarea Populară',
    slug: 'pmp',
  },
  {
    partyShort: 'PRO Romania',
    party: 'PRO Romania Social Liberal',
    slug: 'pro-romania',
  },
  {
    partyShort: 'ALDE',
    party: 'Partidul Alianța Liberalilor și Democraților',
    slug: 'alde',
  },
]
