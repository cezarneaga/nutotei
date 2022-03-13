export function AniHeader({ number }: { number: Number }) {
  return (
    <div className='bg-white'>
      <div className='max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h2 className='text-base font-semibold text-[#f5c646] tracking-wide uppercase'>
            {number} {number === 1 ? `dosar` : `dosare`}
          </h2>
          <p className='mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl'>
            Integritate pe bune
          </p>
          <p className='max-w-xl mt-5 mx-auto text-xl text-gray-500'>
            Suntem un grup de voluntari care încercă să facă informațiile publice despre politicieni cât mai accesibile și mai
            transparente. Încercăm să fim un &quot;ANI pe bune&quot;. Vom publica portretul tuturor parlamentarilor români și vom
            da acces la întreaga bază de date cu informațiile care stau la baza acestor portrete. Informațiile includ toate
            CV-urile existente, declarațiile de avere, declarațiile de interese, date despre firmele unde aceștia au fost sau sunt
            acționari, precum și studiile acestora. În luna februarie vom lansa raportul pentru primii 50 de deputați pentru care
            am colectat toate aceste informații.
          </p>
        </div>
      </div>
    </div>
  )
}
