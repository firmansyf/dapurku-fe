import "./globals.css"
import RootLayoutClient from "./RootLayoutClient"
import localFont from 'next/font/local'

// Server-side metadata
export const metadata = {
  title: 'Dapurku!',
  description: 'Your application description',
}

const NueuPlak = localFont({
  src: '../../public/fonts/NeuePlakRegular.ttf',
  variable: '--font-nueu-plak',
  weight: '500',
});

// Server component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={NueuPlak.variable}>
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  )
}