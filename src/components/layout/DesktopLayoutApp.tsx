/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import Header from "./header/Header"
import { PATHS } from "@/helpers/constants"

interface DesktopAppLayoutProps {
  children: React.ReactNode
}

const notShowHeader = [PATHS.admin]
export default function DesktopAppLayout(props: DesktopAppLayoutProps) {
  const { children } = props
  const [pathname, setPathname] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname)
    }
  }, [])

  return (
    <>
      {!notShowHeader.includes(pathname ?? '') && (
        <Header />  
      )}
      
      <div id="spacer" className="max-sm:pt-[50px] md:pt-0" />
      <div>{children}</div>
    </>
  )
}
