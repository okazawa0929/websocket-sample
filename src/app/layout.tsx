import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import { BatchProcessListener } from '@/providers/batchProcessListener'
import { Providers } from '@/providers/providers'

export const metadata: Metadata = {
  title: 'WebSocket Sample',
  description: 'A sample Next.js app with WebSocket',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body className='grid min-h-screen grid-rows-[auto_1fr]'>
        <Providers>
          <BatchProcessListener />
          <Header />
          <main className='px-10 py-20 grid place-items-center'>
            {children}
            <Toaster position='top-right' closeButton={true} duration={600000} />
          </main>
        </Providers>
      </body>
    </html>
  )
}
