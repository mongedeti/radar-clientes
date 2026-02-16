'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Dashboard() {
  const [clients, setClients] = useState<any[]>([])

  useEffect(() => {
    const fetchClients = async () => {
      const { data } = await supabase.from('clients').select('*')
      setClients(data || [])
    }

    fetchClients()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <pre>{JSON.stringify(clients, null, 2)}</pre>
    </div>
  )
}