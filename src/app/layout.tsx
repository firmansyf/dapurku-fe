import "./globals.css"
import RootLayoutClient from "./RootLayoutClient";

// Server-side metadata
export const metadata = {
  title: 'Dapurku!',
  description: 'Your application description',
}

// Server component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  )
}