import { useState, useEffect } from 'react'

export const useHasScrolledDown = () => {
  const [hasScrolledDown, setHasScrolledDown] = useState(false)

  const onScroll = (e: any) => {
    setHasScrolledDown(e.target.documentElement.scrollTop > 0)
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  })

  return hasScrolledDown
}
