'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { getRadarStatus, getPriorityScore } from '@/lib/radar'

type Client = {
  id: string
  name: string
  email: string | null
  phone: string | null
  last_contact_at: string | null
  next_contact_at: string | null
  created_at: string
}

export default function Dashboard() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showOnlyRisk, setShowOnlyRisk] = useState(false)

  useEffect(() => {
    const fetchClients = async () => {
      const { data } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false })

      if (data) setClients(data)
      setLoading(false)
    }

    fetchClients()
  }, [])

  const handleRegisterContact = async (clientId: string) => {
    const now = new Date().toISOString()

    const { error } = await supabase
      .from('clients')
      .update({ last_contact_at: now })
      .eq('id', clientId)

    if (!error) {
      setClients((prev) =>
        prev.map((c) =>
          c.id === clientId ? { ...c, last_contact_at: now } : c
        )
      )
    }
  }

  if (loading) return <div className="container">Carregando...</div>

  const risco = clients.filter(c => getRadarStatus(c.last_contact_at) === 'risco').length
  const atencao = clients.filter(c => getRadarStatus(c.last_contact_at) === 'atenção').length
  const saudavel = clients.filter(c => getRadarStatus(c.last_contact_at) === 'saudável').length

  const hoje = new Date().toISOString().split('T')[0]
  const contatosHoje = clients.filter(
    c => c.next_contact_at && c.next_contact_at.startsWith(hoje)
  ).length

  const sortedClients = [...clients].sort((a, b) => {
    const priorityDiff =
      getPriorityScore(a.last_contact_at) -
      getPriorityScore(b.last_contact_at)

    if (priorityDiff !== 0) return priorityDiff

    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  const filteredClients = showOnlyRisk
    ? sortedClients.filter(c => getRadarStatus(c.last_contact_at) === 'risco')
    : sortedClients

  return (
  <div className="container">

    <div className="page-header">
      <h1 className="page-title">Radar C</h1>
      <div className="user-info">Painel de clientes</div>
    </div>

    {/* MÉTRICAS */}
    <div className="metrics-grid">
      <div className="metric-card metric-risk">
        <div className="metric-title">
          <span className="metric-dot dot-risk"></span>
          Em Risco
        </div>
        <div className="metric-value">{risco}</div>
      </div>

      <div className="metric-card metric-warning">
        <div className="metric-title">
          <span className="metric-dot dot-warning"></span>
          Atenção
        </div>
        <div className="metric-value">{atencao}</div>
      </div>

      <div className="metric-card metric-healthy">
        <div className="metric-title">
          <span className="metric-dot dot-healthy"></span>
          Saudáveis
        </div>
        <div className="metric-value">{saudavel}</div>
      </div>

      <div className="metric-card metric-info">
        <div className="metric-title">
          <span className="metric-dot dot-info"></span>
          Contatos Hoje
        </div>
        <div className="metric-value">{contatosHoje}</div>
      </div>
    </div>

    {/* FILTRO */}
    <div style={{ marginBottom: 20 }}>
      <button
        onClick={() => setShowOnlyRisk(!showOnlyRisk)}
        className={`btn ${showOnlyRisk ? 'btn-danger' : 'btn-secondary'}`}
      >
        {showOnlyRisk
          ? 'Mostrando apenas clientes em risco'
          : 'Mostrar apenas clientes em risco'}
      </button>
    </div>

    {/* LISTA */}
    <ul className="client-list">
      {filteredClients.map((client) => {
        const status = getRadarStatus(client.last_contact_at)

        const badgeClass =
          status === 'risco'
            ? 'badge badge-risk'
            : status === 'atenção'
            ? 'badge badge-warning'
            : 'badge badge-healthy'

        return (
          <li key={client.id} className="client-card">
            <div>
              <strong>{client.name}</strong>
              <div style={{ marginTop: 6 }}>
                <span className={badgeClass}>
                  {status.toUpperCase()}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleRegisterContact(client.id)}
              className="btn btn-primary"
            >
              Registrar Contato
            </button>
          </li>
        )
      })}
    </ul>

  </div>
)
}