'use client'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StateProvider } from "@/context/authContextProvider"
import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/useIsMobile"
import Viewport from "@/components/layout/Viewport"
import DesktopAppLayout from "@/components/layout/DesktopLayoutApp"
import MobileAppLayout from "@/components/layout/MobileLayoutApp"
import { Toaster } from 'react-hot-toast'

interface RootLayoutClientProps {
  children: React.ReactNode
}

export default function RootLayoutClient({ 
  children
}: RootLayoutClientProps) {
  const isMobile = useIsMobile()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, []);
    
  const client = new QueryClient({
    defaultOptions: { 
      queries: { 
        retry: false, 
        refetchOnWindowFocus: false 
      } 
    },
  })

  if (!isClient) {
    return null;
  }

  return (
    <QueryClientProvider client={client}>
      <StateProvider>
        <Viewport isMobile={isMobile} />
        <Toaster
          position="top-center"
          toastOptions={{ duration: 3000 }}
        />
        {isMobile ? (
          <MobileAppLayout>
            {children}
          </MobileAppLayout>
        ) : (
          <DesktopAppLayout>
            {children}
          </DesktopAppLayout>
        )}
      </StateProvider>
    </QueryClientProvider>
  )
}