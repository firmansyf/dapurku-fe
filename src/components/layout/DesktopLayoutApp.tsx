import Header from "./header/Header"

/* eslint-disable @typescript-eslint/no-explicit-any */

interface DesktopAppLayoutProps {
  children: React.ReactNode
}


export default function DesktopAppLayout(props: DesktopAppLayoutProps) {
  const { children } = props


  return (
    <>
      <Header />
      <div id="spacer" className="max-sm:pt-[50px] md:pt-0" />
     <div>{children}</div>
    </>
  )
}
