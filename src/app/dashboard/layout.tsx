'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        router.push('/login')
      } else {
        setEmail(data.session.user.email ?? null)
      }
    }

    checkSession()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* SIDEBAR */}
      <div
        style={{
          width: 240,
          background: '#0f172a',
          color: '#fff',
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h2 style={{ marginBottom: 40 }}>Radar C</h2>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <a href="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>
              Dashboard
            </a>

            <a href="/clients" style={{ color: '#fff', textDecoration: 'none' }}>
              Novo Cliente
            </a>
          </nav>
        </div>

        <div>
          <p style={{ fontSize: 12, marginBottom: 10 }}>{email}</p>

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: 8,
              borderRadius: 6,
              border: 'none',
              background: '#ef4444',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Sair
          </button>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div style={{ flex: 1, background: '#f1f5f9', padding: 40 }}>
        {children}
      </div>
    </div>
  )
}