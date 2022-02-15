export function AniHeader({ number }: { number: Number }) {
  return (
    <div className='bg-white'>
      <div className='max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h2 className='text-base font-semibold text-red-600 tracking-wide uppercase'>
            {number} {number === 1 ? `dosar` : `dosare`}
          </h2>
          <p className='mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl'>ANI pe bune</p>
          <p className='max-w-xl mt-5 mx-auto text-xl text-gray-500'>Lorem ipsum..</p>
        </div>
      </div>
    </div>
  )
}
