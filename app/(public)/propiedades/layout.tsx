import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'FeedbackApp - Plataforma de Feedback para Restaurantes',
  description: 'Comparte tu experiencia y descubre los mejores restaurantes',
};

export default function RestaurantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-900">
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
            <a
              href="/admin"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              Admin
            </a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-8 dark:border-zinc-800">
        <div className="container mx-auto px-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
           <p>© 2025 Inmobiliaria William Cardona. Impulsando sueños y nuevos comienzos.</p>
        </div>
      </footer>
    </div>
  );
}
