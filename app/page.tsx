import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Image
              src="/Logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-zinc-900 dark:text-white">
              Inmobiliaria William Cardona
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
      <main className="bg-gradient-to-b from-sky-200 to-sky-50 dark:from-black dark:to-zinc-900">
      {/* Shared Background Section for Hero and How It Works */}
      <div className="w-full" style={{
        backgroundImage: "url('/imagenes/manizales.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-white">
              Inmobiliaria William Cardona 
              <span className="block text-4xl text-white/90">
                Tu aliado en bienes raíces
              </span>
            </h1>
            <p className="mb-8 text-lg text-white/90">
              Descubre las mejores propiedades, comparte tu experiencia y confía en un aliado transparente para tus decisiones inmobiliarias.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/restaurants"
                className="rounded-lg bg-zinc-900 px-8 py-3 font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                Ver Propiedades
              </Link>
              <Link
                href="/feedback/new"
                className="rounded-lg bg-zinc-900 px-8 py-3 font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                Dejar Feedback
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="mb-20">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            ¿Cómo Funciona?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-2xl text-white dark:bg-white dark:text-zinc-900">
                  1
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Explora Propiedades
              </h3>
              <p className="text-white/90">
                Busca y encuentra casas, apartamentos, lotes o locales disponibles en nuestra plataforma.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-2xl text-white dark:bg-white dark:text-zinc-900">
                  2
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Agenda una Visita
              </h3>
              <p className="text-white/90">
                Coordina fácilmente una cita para conocer la propiedad en persona y resolver tus dudas con un asesor.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-2xl text-white dark:bg-white dark:text-zinc-900">
                  3
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Toma la Mejor Decisión
              </h3>
              <p className="text-white/90">
                Recibe acompañamiento profesional durante todo el proceso para elegir, comprar o arrendar con total confianza.
              </p>
            </div>
          </div>
        </section>
                </div>
        </div>

        <div className="py-16">
          <div className="container mx-auto px-4">

        {/* Features Section */}
        <section className="mb-20">
          <h2 className="mb-12 text-center text-3xl font-bold text-zinc-900 dark:text-white">
            Características
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-3 text-3xl">🏠</div>
              <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
                Explora Propiedades
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Accede a un catálogo actualizado de casas, apartamentos, locales y proyectos disponibles.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-3 text-3xl">📅</div>
              <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
                Agenda de Visitas
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Programa recorridos fácilmente y recibe confirmación inmediata por parte de nuestros asesores.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-3 text-3xl">💬</div>
              <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
                Asesoría Personalizada
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Obtén acompañamiento profesional en cada etapa: búsqueda, negociación, compra o arriendo.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-3 text-3xl">📑</div>
              <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
                Información Transparente
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Accede a detalles reales: precios, ubicación, características y documentación disponible.
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
              Descubre las diferentes propiedades que tenemos para ti y encuentra tu próximo hogar con Inmobiliaria William Cardona.
            </p>
            <Link
              href="/restaurants"
              className="inline-block rounded-lg bg-zinc-900 px-8 py-3 font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              Ver Propiedades
            </Link>
          </div>
        </section>
        </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-8 dark:border-zinc-800">
        <div className="container mx-auto px-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
          <p>© 2025 Inmobiliaria William Cardona. Impulsando sueños y nuevos comienzos.</p>
        </div>
      </footer>
    </div>
  );
}
