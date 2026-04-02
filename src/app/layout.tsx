import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'Radar C',
  description: 'Sistema de retenção e organização de clientes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>

        {/* Google Ads Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-840339942"
          strategy="afterInteractive"
        />

        <Script id="google-ads">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-840339942');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}