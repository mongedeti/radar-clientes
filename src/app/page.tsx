import Link from 'next/link'

export default function Home() {
  return (
    <main className="landing-container">

      {/* HERO */}
      <section className="landing-section landing-center" style={{ textAlign: 'center' }}>
        <h1 className="hero-title">
          Nunca mais perca cliente por falta de contato.
        </h1>

        <p className="hero-subtitle">
          O Radar C mostra exatamente quem você precisa contatar
          antes que a oportunidade esfrie.
        </p>

        <Link href="/signup">
          <button className="btn-primary-large">
            Testar grátis por 7 dias
          </button>
        </Link>

        <p style={{ marginTop: 12, fontSize: 14, opacity: 0.6 }}>
          Sem cartão. Sem compromisso.
        </p>
      </section>

      {/* DOR */}
      <section className="landing-section section-gray">
        <div className="landing-center">
          <h2>Você já passou por isso?</h2>

          <ul style={{ lineHeight: 1.8, marginTop: 20 }}>
            <li>• Esqueceu de retornar um cliente interessado</li>
            <li>• Perdeu um orçamento por demora na resposta</li>
            <li>• Não lembra quem precisa de follow-up</li>
            <li>• Depende da memória ou do WhatsApp para se organizar</li>
          </ul>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="landing-section">
        <div className="landing-center" style={{ textAlign: 'center' }}>
          <h2>Como funciona</h2>

          <div className="grid-3">
            <div>
              <h3>1️⃣ Cadastre seus clientes</h3>
              <p style={{ opacity: 0.7 }}>
                Registre rapidamente quem entrou em contato com você.
              </p>
            </div>

            <div>
              <h3>2️⃣ O Radar monitora o tempo</h3>
              <p style={{ opacity: 0.7 }}>
                O sistema identifica quando um cliente começa a esfriar.
              </p>
            </div>

            <div>
              <h3>3️⃣ Você age antes de perder</h3>
              <p style={{ opacity: 0.7 }}>
                Saiba exatamente quem precisa de atenção agora.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="landing-section section-dark">
        <div className="landing-center" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: 30 }}>
            Comece agora e proteja sua carteira de clientes.
          </h2>

          <div style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link href="/signup">
              <button className="btn-primary-large">
                Criar conta gratuita
              </button>
            </Link>

            <Link href="/login">
              <button className="btn-outline-light">
                Login
              </button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}