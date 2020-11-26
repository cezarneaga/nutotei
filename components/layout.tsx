import { ReactElement } from "react";
import { useHasScrolledDown } from "lib/useHasScrolledDown";
import { Nav } from "components/nav";
import { Footer } from "components/footer";

export default function Layout({
  preview,
  children,
}: {
  preview: boolean;
  children: ReactElement | ReactElement[];
}) {
  const hasScrolledDown = useHasScrolledDown();
  //   const bgColor = useColorModeValue(
  //     hasScrolledDown ? 'translucid.white' : 'white',
  //     hasScrolledDown ? 'translucid.black' : 'gray.800'
  //   )
  //   const boxShadow = useColorModeValue(
  //     '0 0 7px rgba(0, 0, 0, 0.1)',
  //     '0 0 7px rgba(22, 31, 41, 0.9)'
  //   )
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
