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
    partyShort: 'USR',
    party: 'Uniunea Salvaţi România',
    slug: 'usr',
  },
  {
    partyShort: 'AUR',
    party: 'Alianța pentru Unirea Românilor',
    slug: 'aur',
  },
  {
    partyShort: 'UDMR',
    party: 'Uniunea Democrată Maghiară din România',
    slug: 'udmr',
  },
  {
    partyShort: 'Minorități',
    party: 'Minorități Naționale',
    slug: 'minoritati',
  },
  {
    partyShort: 'Neafiliaţi',
    party: 'Neafiliaţi',
    slug: 'neafiliati',
  },
]
