'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Signup() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async () => {
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError('Erro ao criar conta')
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="card">
      <h1 className="title">Radar C</h1>
      <p className="subtitle">Crie sua conta</p>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />

      {error && <p className="error">{error}</p>}

      <button onClick={handleSignup} disabled={loading} className="button">
        {loading ? 'Criando...' : 'Criar Conta'}
      </button>

      <p className="link-text">
        Já tem conta? <a href="/login">Entrar</a>
      </p>
    </div>
  )
}