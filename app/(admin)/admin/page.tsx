export default function DashboardPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Resumen de métricas y actividad reciente
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Total Feedbacks
            </span>
            <span className="text-2xl">📝</span>
          </div>
          <div className="mb-1 text-3xl font-bold text-zinc-900 dark:text-white">
            247
          </div>
          <div className="text-sm text-green-600 dark:text-green-400">
            +12% vs mes anterior
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Rating Promedio
            </span>
            <span className="text-2xl">⭐</span>
          </div>
          <div className="mb-1 text-3xl font-bold text-zinc-900 dark:text-white">
            4.5
          </div>
          <div className="text-sm text-green-600 dark:text-green-400">
            +0.3 vs mes anterior
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Felicitaciones
            </span>
            <span className="text-2xl">👏</span>
          </div>
          <div className="mb-1 text-3xl font-bold text-zinc-900 dark:text-white">
            156
          </div>
          <div className="text-sm text-green-600 dark:text-green-400">
            63% del total
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Posición Ranking
            </span>
            <span className="text-2xl">🏆</span>
          </div>
          <div className="mb-1 text-3xl font-bold text-zinc-900 dark:text-white">
            #12
          </div>
          <div className="text-sm text-green-600 dark:text-green-400">
            ↑ 3 posiciones
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        {/* Rating Distribution */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
            Distribución de Ratings
          </h2>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="w-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {rating}
                </span>
                <div className="flex-1">
                  <div className="h-6 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-zinc-900 dark:bg-white"
                      style={{
                        width: `${[70, 20, 6, 3, 1][5 - rating]}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="w-10 text-right text-sm text-zinc-600 dark:text-zinc-400">
                  {[173, 49, 15, 7, 3][5 - rating]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Types */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
            Tipos de Feedback
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">👏</span>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  Felicitaciones
                </span>
              </div>
              <span className="text-lg font-semibold text-zinc-900 dark:text-white">
                156 (63%)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💡</span>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  Sugerencias
                </span>
              </div>
              <span className="text-lg font-semibold text-zinc-900 dark:text-white">
                67 (27%)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  Quejas
                </span>
              </div>
              <span className="text-lg font-semibold text-zinc-900 dark:text-white">
                24 (10%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Feedbacks */}
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Feedbacks Recientes
          </h2>
          <a
            href="/admin/feedbacks"
            className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            Ver todos →
          </a>
        </div>
        <div className="space-y-4">
          {[
            {
              user: 'Feliz Comensal 234',
              type: 'compliment',
              rating: 5,
              comment:
                'Excelente servicio y la comida estaba deliciosa. Volveré sin duda.',
              time: 'Hace 2 horas',
            },
            {
              user: 'Cliente Anónimo',
              type: 'suggestion',
              rating: 4,
              comment:
                'Muy buena experiencia, aunque podrían mejorar el tiempo de espera.',
              time: 'Hace 5 horas',
            },
            {
              user: 'Alegre Visitante 567',
              type: 'compliment',
              rating: 5,
              comment: 'Ambiente acogedor y personal muy atento. Recomendado!',
              time: 'Hace 1 día',
            },
          ].map((feedback, index) => (
            <div
              key={index}
              className="flex gap-4 rounded-lg border border-zinc-100 p-4 dark:border-zinc-800"
            >
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-medium text-zinc-900 dark:text-white">
                    {feedback.user}
                  </span>
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {feedback.type === 'compliment'
                      ? '👏 Felicitación'
                      : '💡 Sugerencia'}
                  </span>
                  <span className="text-sm text-yellow-500">
                    {'⭐'.repeat(feedback.rating)}
                  </span>
                </div>
                <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {feedback.comment}
                </p>
                <span className="text-xs text-zinc-500 dark:text-zinc-500">
                  {feedback.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
