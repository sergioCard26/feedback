import Link from 'next/link';
import Image from 'next/image';

// Mock data - Replace with actual service call
const mockRestaurants = [
  {
    id: '1',
    name: 'La Trattoria Italiana',
    cuisineType: 'Italiana',
    ranking: 1,
    averageRating: 4.8,
    totalFeedbacks: 234,
    address: 'Calle Principal 123, Centro',
    imageUrl: '/restaurants/trattoria.jpg',
    hasPromotion: true,
    promotionText: '20% OFF en pastas los martes',
    recentReviews: [
      {
        id: 'r1',
        userName: 'Feliz Comensal 234',
        rating: 5,
        comment: 'Excelente pasta casera y servicio impecable. El ambiente es muy acogedor.',
        timeAgo: 'Hace 2 días',
      },
      {
        id: 'r2',
        userName: 'María G.',
        rating: 5,
        comment: 'Mejor pasta carbonara que he probado. Totalmente recomendado.',
        timeAgo: 'Hace 1 semana',
      },
    ],
  },
  {
    id: '2',
    name: 'Sushi Master',
    cuisineType: 'Japonesa',
    ranking: 2,
    averageRating: 4.7,
    totalFeedbacks: 189,
    address: 'Av. Libertador 456, Miraflores',
    imageUrl: '/restaurants/sushi.jpg',
    hasPromotion: false,
    recentReviews: [
      {
        id: 'r3',
        userName: 'Alegre Visitante 567',
        rating: 5,
        comment: 'Sushi fresco y de calidad. El chef es muy profesional.',
        timeAgo: 'Hace 3 días',
      },
      {
        id: 'r4',
        userName: 'Carlos R.',
        rating: 4,
        comment: 'Muy bueno, aunque el precio es un poco elevado.',
        timeAgo: 'Hace 5 días',
      },
    ],
  },
  {
    id: '3',
    name: 'El Asador Criollo',
    cuisineType: 'Argentina',
    ranking: 3,
    averageRating: 4.6,
    totalFeedbacks: 167,
    address: 'Calle San Martín 789, San Isidro',
    imageUrl: '/restaurants/asador.jpg',
    hasPromotion: true,
    promotionText: 'Happy Hour 2x1 en bebidas 18-20hs',
    recentReviews: [
      {
        id: 'r5',
        userName: 'Curioso Gourmet 123',
        rating: 5,
        comment: 'Las mejores carnes de la zona. Cocción perfecta.',
        timeAgo: 'Hace 1 día',
      },
      {
        id: 'r6',
        userName: 'Ana M.',
        rating: 4,
        comment: 'Excelente calidad de carne. El servicio podría mejorar.',
        timeAgo: 'Hace 4 días',
      },
    ],
  },
  {
    id: '4',
    name: 'Vegan Delights',
    cuisineType: 'Vegana',
    ranking: 4,
    averageRating: 4.5,
    totalFeedbacks: 143,
    address: 'Calle Verde 321, Palermo',
    imageUrl: '/restaurants/vegan.jpg',
    hasPromotion: false,
    recentReviews: [
      {
        id: 'r7',
        userName: 'Simpático Cliente 890',
        rating: 5,
        comment: 'Opciones veganas deliciosas y creativas. Me sorprendió gratamente.',
        timeAgo: 'Hace 2 días',
      },
      {
        id: 'r8',
        userName: 'Laura P.',
        rating: 4,
        comment: 'Buena comida saludable. Porciones generosas.',
        timeAgo: 'Hace 1 semana',
      },
    ],
  },
];

export default function RestaurantsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-zinc-900 dark:text-white">
          Ranking de Restaurantes
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Descubre los mejores restaurantes según opiniones reales de clientes
        </p>
      </div>

      {/* Filters Bar */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <select className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
          <option>Todos los tipos de cocina</option>
          <option>Italiana</option>
          <option>Japonesa</option>
          <option>Argentina</option>
          <option>Vegana</option>
        </select>
        <select className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
          <option>Ordenar por: Ranking</option>
          <option>Mejor valorados</option>
          <option>Más reseñas</option>
        </select>
        <div className="ml-auto text-sm text-zinc-600 dark:text-zinc-400">
          {mockRestaurants.length} restaurantes encontrados
        </div>
      </div>

      {/* Restaurants List */}
      <div className="space-y-6">
        {mockRestaurants.map((restaurant) => (
          <article
            key={restaurant.id}
            className="rounded-2xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex flex-col gap-6 lg:flex-row">
              {/* Restaurant Image */}
              <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 lg:h-auto lg:w-64">
                {restaurant.imageUrl ? (
                  <Image
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-6xl">
                    🍽️
                  </div>
                )}
                {/* Ranking Badge */}
                <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 font-bold text-white dark:bg-white dark:text-zinc-900">
                  #{restaurant.ranking}
                </div>
              </div>

              {/* Restaurant Info */}
              <div className="flex-1">
                <div className="mb-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <Link
                        href={`/restaurants/${restaurant.id}`}
                        className="text-2xl font-bold text-zinc-900 hover:text-zinc-600 dark:text-white dark:hover:text-zinc-400"
                      >
                        {restaurant.name}
                      </Link>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {restaurant.cuisineType}
                      </p>
                    </div>
                  </div>

                  {/* Rating & Stats */}
                  <div className="mb-3 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                        {restaurant.averageRating}
                      </span>
                      <span className="text-yellow-500">⭐</span>
                    </div>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      {restaurant.totalFeedbacks} reseñas
                    </span>
                  </div>

                  {/* Address */}
                  <div className="mb-3 flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <span>📍</span>
                    <span>{restaurant.address}</span>
                  </div>

                  {/* Promotion Badge */}
                  {restaurant.hasPromotion && restaurant.promotionText && (
                    <div className="mb-4 inline-block rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                      🎉 {restaurant.promotionText}
                    </div>
                  )}
                </div>

                {/* Recent Reviews */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                    Reseñas Recientes
                  </h3>
                  {restaurant.recentReviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-lg border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-800"
                    >
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-sm font-medium text-zinc-900 dark:text-white">
                          {review.userName}
                        </span>
                        <span className="text-sm text-yellow-500">
                          {'⭐'.repeat(review.rating)}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-500">
                          {review.timeAgo}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={`/restaurants/${restaurant.id}`}
                    className="rounded-lg bg-zinc-900 px-6 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                  >
                    Ver Detalles
                  </Link>
                  <Link
                    href={`/feedback/new?restaurantId=${restaurant.id}`}
                    className="rounded-lg border border-zinc-300 px-6 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
                  >
                    Dejar Reseña
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-2">
        <button className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800">
          Anterior
        </button>
        <button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-zinc-900">
          1
        </button>
        <button className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800">
          2
        </button>
        <button className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800">
          3
        </button>
        <button className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800">
          Siguiente
        </button>
      </div>
    </div>
  );
}
