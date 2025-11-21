import Link from 'next/link'; 

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-900">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍽️</span>
            <span className="text-xl font-bold text-zinc-900 dark:text-white">
              FeedbackApp
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#ranking"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Ranking
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Cómo Funciona
            </a>
            <Link
              href="/admin"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              Admin
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Tu opinión importa
              <span className="block text-4xl text-zinc-600 dark:text-zinc-400">
                Ayuda a mejorar el servicio
              </span>
            </h1>
            <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
              Comparte tu experiencia en restaurantes, descubre los mejores
              lugares y contribuye a un ranking transparente basado en
              experiencias reales.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/restaurants"
                className="rounded-lg bg-zinc-900 px-8 py-3 font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                Ver Restaurantes
              </Link>
              <Link
                href="/feedback/new"
                className="rounded-lg border border-zinc-300 px-8 py-3 font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900"
              >
                Dejar Feedback
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-2 text-4xl font-bold text-zinc-900 dark:text-white">
                1,234
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                Feedbacks Recibidos
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-2 text-4xl font-bold text-zinc-900 dark:text-white">
                156
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                Restaurantes Registrados
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-2 text-4xl font-bold text-zinc-900 dark:text-white">
                4.5
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                Rating Promedio
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="mb-20">
          <h2 className="mb-12 text-center text-3xl font-bold text-zinc-900 dark:text-white">
            ¿Cómo Funciona?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-2xl text-white dark:bg-white dark:text-zinc-900">
                  1
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
                Visita un Restaurante
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Disfruta tu comida y experiencia en cualquier restaurante
                registrado en nuestra plataforma.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-2xl text-white dark:bg-white dark:text-zinc-900">
                  2
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
                Comparte tu Opinión
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Deja tu feedback sobre comida, servicio, ambiente y más. Puedes
                ser anónimo si lo prefieres.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-2xl text-white dark:bg-white dark:text-zinc-900">
                  3
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
                Ayuda a Mejorar
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Tu feedback ayuda a otros clientes y motiva a los restaurantes a
                mejorar constantemente.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <h2 className="mb-12 text-center text-3xl font-bold text-zinc-900 dark:text-white">
            Características
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-3 text-3xl">⭐</div>
              <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
                Sistema de Rating
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Califica diferentes aspectos: comida, servicio, lugar y
                recomendación general.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-3 text-3xl">🎭</div>
              <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
                Feedback Anónimo
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Opción de dejar comentarios de forma anónima con nombres
                aleatorios generados.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-3 text-3xl">📊</div>
              <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
                Ranking Transparente
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Ranking público basado en feedback real de clientes verificados.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-3 text-3xl">💼</div>
              <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
                Panel para Dueños
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Dashboard completo con métricas y análisis para mejorar tu
                negocio.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="ranking" className="text-center">
          <div className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-white p-12 dark:border-zinc-800 dark:from-zinc-900 dark:to-black">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-white">
              ¿Listo para explorar?
            </h2>
            <p className="mb-6 text-zinc-600 dark:text-zinc-400">
              Descubre los restaurantes mejor valorados de tu ciudad
            </p>
            <Link
              href="/restaurants"
              className="inline-block rounded-lg bg-zinc-900 px-8 py-3 font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              Ver Ranking Completo
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-8 dark:border-zinc-800">
        <div className="container mx-auto px-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
          <p>© 2025 FeedbackApp. Impulsando la excelencia en el servicio.</p>
        </div>
      </footer>
    </div>
  );
}
