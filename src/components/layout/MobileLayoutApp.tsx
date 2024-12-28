/* eslint-disable @typescript-eslint/no-explicit-any */

interface MobileAppLayoutProps {
  children: React.ReactNode
}

export default function MobileAppLayout(props: MobileAppLayoutProps) {
  const { children } = props


  return (
    <>
      {/* <Header /> */}
      <div id="spacer" className="max-sm:pt-[50px] md:pt-0" />
      <div>{children}</div>
    </>
  )
}
