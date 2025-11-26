import Link from 'next/link';
import Image from 'next/image';

// Mock data - propiedades en Manizales (mezcla de venta y arrendamiento)
const mockProperties = [
  {
    id: '1',
    name: 'Apartaestudio Edificio Tamanaco',
    propertyType: 'Apartaestudio',
    listingType: 'Arriendo',
    price: 850000, // COP / mes
    ranking: 1,
    averageRating: 4.8,
    totalFeedbacks: 34,
    address: ' Centro, Manizales',
    imageUrl: '/propiedades/propiedad1/tamanaco.jpg',
    hasPromotion: false,
    recentReviews: [
      {
        id: 'r1',
        userName: 'Inquilino Feliz',
        rating: 5,
        comment: 'Lugar muy acogedor y cerca al centro, ideal para estudiantes.',
        timeAgo: 'Hace 2 días',
      },
    ],
  },
  {
    id: '2',
    name: 'Casa La Toscana',
    propertyType: 'Casa',
    listingType: 'Venta',
    price: 420000000, // COP
    ranking: 2,
    averageRating: 4.7,
    totalFeedbacks: 18,
    address: 'Carrera 21 #30-10, Barrio Chipre, Manizales',
    imageUrl: '/propiedades/propiedad2/casa.jpg',
    hasPromotion: false,
    recentReviews: [
      {
        id: 'r3',
        userName: 'Comprador Satisfecho',
        rating: 5,
        comment: 'Excelente vecindario y gran iluminación natural.',
        timeAgo: 'Hace 3 días',
      },
    ],
  },
  {
    id: '3',
    name: 'Apartamento Puertas del Sol',
    propertyType: 'Apartamento',
    listingType: 'Arriendo',
    price: 1600000, // COP / mes
    ranking: 3,
    averageRating: 4.6,
    totalFeedbacks: 27,
    address: 'Transversal 4 #18-60, Barrio Puertas del Sol, Manizales',
    imageUrl: '/propiedades/propiedad3/apartamentoPS.jpg',
    hasPromotion: true,
    promotionText: 'Mes de administración gratis al firmar contrato a 1 año',
    recentReviews: [
      {
        id: 'r5',
        userName: 'Familia Pérez',
        rating: 5,
        comment: 'Buena distribución y vista agradable.',
        timeAgo: 'Hace 1 día',
      },
    ],
  },
  {
    id: '4',
    name: 'Lote La Enea',
    propertyType: 'Lote',
    listingType: 'Venta',
    price: 95000000, // COP
    ranking: 4,
    averageRating: 4.5,
    totalFeedbacks: 9,
    address: 'Vereda La Enea, sector Camino Real, Manizales',
    imageUrl: '/propiedades/propiedad4/lote.jpg',
    hasPromotion: false,
    recentReviews: [
      {
        id: 'r7',
        userName: 'Inversor Local',
        rating: 4,
        comment: 'Ubicación prometedora para proyectos pequeños.',
        timeAgo: 'Hace 2 semanas',
      },
    ],
  },
];

export default function RestaurantsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-zinc-900 dark:text-white">Listado de Propiedades</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Propiedades disponibles en Manizales (venta y arriendo). Encuentra la que se ajuste a
          tus necesidades.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <select className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
          <option>Todos los tipos de inmueble</option>
          <option>Apartamento</option>
          <option>Casa</option>
          <option>Apartaestudio</option>
          <option>Lote</option>
        </select>
        <select className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
          <option>Ordenar por: Ranking</option>
          <option>Mejor valorados</option>
          <option>Más reseñas</option>
        </select>
        <div className="ml-auto text-sm text-zinc-600 dark:text-zinc-400">{mockProperties.length} propiedades encontradas</div>
      </div>

      {/* Restaurants List */}
      <div className="space-y-6">
        {mockProperties.map((restaurant) => (
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
                        {restaurant.propertyType} · {restaurant.listingType} ·{' '}
                        {restaurant.listingType === 'Arriendo'
                          ? `${restaurant.price.toLocaleString('es-CO')} COP / mes`
                          : `${restaurant.price.toLocaleString('es-CO')} COP`}
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
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">{restaurant.totalFeedbacks} reseñas</span>
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
