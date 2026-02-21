'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function NewClient() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreate = async () => {
    setLoading(true)
    setError(null)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push('/login')
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', user.id)
      .single()

    if (!profile) {
      setError('Perfil não encontrado')
      setLoading(false)
      return
    }

    const { error } = await supabase.from('clients').insert([
      {
        name,
        email,
        phone,
        tenant_id: profile.tenant_id,
      },
    ])

    if (error) {
      setError('Erro ao criar cliente')
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="card">
      <h1 className="title">Novo Cliente</h1>
      <p className="subtitle">Adicionar cliente ao Radar</p>

      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />

      <input
        type="text"
        placeholder="Telefone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="input"
      />

      {error && <p className="error">{error}</p>}

      <button onClick={handleCreate} disabled={loading} className="button">
        {loading ? 'Salvando...' : 'Salvar Cliente'}
      </button>
    </div>
  )
}