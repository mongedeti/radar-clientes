import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}