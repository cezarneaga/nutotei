import { ReactElement } from 'react'
import { Nav } from 'components/nav'
import { Footer } from 'components/footer'

export default function Layout({ preview, children }: { preview: boolean; children: ReactElement | ReactElement[] }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  )
}
