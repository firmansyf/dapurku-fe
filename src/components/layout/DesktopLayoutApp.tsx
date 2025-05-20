/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import Header from "./header/Header"
import { PATHS } from "@/helpers/constants"
import HeaderAdmin from "./header/admin/Header"
import Footer from "./footer/Footer"


interface DesktopAppLayoutProps {
  children: React.ReactNode
}

const DesktopAppLayout = ({ children }: DesktopAppLayoutProps) => {
  const [pathname, setPathname] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  const shouldShowHeaderAdmin = pathname && [PATHS.productManagement, PATHS.userManagement].includes(pathname);
  const shouldShowHeader = pathname && ![PATHS.admin, PATHS.register, PATHS.userManagement, PATHS.productManagement].includes(pathname);

  return (
    <>
      {shouldShowHeaderAdmin && <HeaderAdmin />}
      {shouldShowHeader && <Header />}
      <div id="spacer" className="max-sm:pt-[50px] md:pt-0" />
      <div>{children}</div>
      {shouldShowHeader && <Footer />}
    </>
  );
};

export default DesktopAppLayout;
