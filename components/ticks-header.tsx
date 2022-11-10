export function TicksHeader({ number }: { number: Number }) {
  return (
    <div className='bg-white'>
      <div className='max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h2 className='text-base font-semibold text-[#f5c646] tracking-wide uppercase'>
            <>
              {number} {number === 1 ? `căpușă` : `căpușe`}
            </>
          </h2>
          <p className='mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl'>România căpușată</p>
          <p className='max-w-xl mt-5 mx-auto text-xl text-gray-500'>
            Ne-am adunat câțiva voluntari și o să încercăm să facem o cercetare, un fel de hartă a României căpușate. Despre
            cazurile cele mai dure o să scriu în Libertatea.
          </p>
        </div>
      </div>
    </div>
  )
}
