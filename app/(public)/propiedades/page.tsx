'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getStoredProperties, type Property } from '@/app/admin/utils/propertyStorage';

// Mock data - propiedades en Manizales (mezcla de venta y arrendamiento)
const mockProperties = [
  {
    id: '1',
    name: 'Apartaestudio Edificio Tamanaco',
    propertyType: 'Apartaestudio',
    listingType: 'Arriendo',
    price: 850000, // COP / mes
    ranking: 1,
    address: 'Centro, Manizales',
    imageUrl: '/propiedades/propiedad1/tamanaco.jpg',
    hasPromotion: false,
    details: 'Estudio de 35m², piso 8, amoblado, acceso a gimnasio y zona común. Ideal para estudiantes o profesionales.',
  },
  {
    id: '2',
    name: 'Casa La Toscana',
    propertyType: 'Casa',
    listingType: 'Venta',
    price: 420000000, // COP
    ranking: 2,
    address: 'Carrera 21 #30-10, Barrio Chipre, Manizales',
    imageUrl: '/propiedades/propiedad2/casa.jpg',
    hasPromotion: false,
    details: '3 alcobas, 2 baños, 180m² construidos, lote 250m², garaje para 2 autos, patio trasero.',
  },
  {
    id: '3',
    name: 'Apartamento Puertas del Sol',
    propertyType: 'Apartamento',
    listingType: 'Arriendo',
    price: 1600000, // COP / mes
    ranking: 3,
    address: 'Transversal 4 #18-60, Barrio Puertas del Sol, Manizales',
    imageUrl: '/propiedades/propiedad3/apartamentoPS.jpg',
    hasPromotion: true,
    promotionText: 'Mes de administración gratis al firmar contrato a 1 año',
    details: '2 alcobas, 2 baños, 95m² construidos, piso 6, balcón con vista, parqueadero incluido.',
  },
  {
    id: '4',
    name: 'Lote La Enea',
    propertyType: 'Lote',
    listingType: 'Venta',
    price: 95000000, // COP
    ranking: 4,
    address: 'Vereda La Enea, sector Camino Real, Manizales',
    imageUrl: '/propiedades/propiedad4/lote.jpg',
    hasPromotion: false,
    details: 'Lote de 5000m², con servicios públicos disponibles (agua, luz). Excelente para proyecto residencial o comercial.',
  },{
    id: '5',
    name: 'Lote La Enea',
    propertyType: 'Lote',
    listingType: 'Venta',
    price: 95000000, // COP
    ranking: 5,
    address: 'Vereda La Enea, sector Camino Real, Manizales',
    imageUrl: '/propiedades/propiedad4/lote.jpg',
    hasPromotion: false,
    details: 'Lote de 5000m², con servicios públicos disponibles (agua, luz). Excelente para proyecto residencial o comercial.',
  },
];

const ITEMS_PER_PAGE = 4;

export default function PropertiesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allProperties, setAllProperties] = useState<Property[]>([]);

  // Cargar propiedades de localStorage + mock data
  useEffect(() => {
    const storedProps = getStoredProperties();
    // Convertir mock properties al formato completo
    const mockWithFullData = mockProperties.map((p: any) => ({
      ...p,
      description: p.description || p.details,
      features: p.features || [],
      images: p.imageUrl ? [{ id: '1', data: p.imageUrl, name: 'image' }] : [],
      createdAt: new Date().toISOString(),
    }));
    
    const combinedProps = [...storedProps, ...mockWithFullData];
    // Eliminar duplicados por ID (las de localStorage tienen prioridad)
    const uniqueProps = Array.from(
      new Map(combinedProps.map((p) => [p.id, p])).values()
    ) as Property[];
    setAllProperties(uniqueProps);
  }, []);

  // Calcular total de páginas
  const totalPages = Math.ceil(allProperties.length / ITEMS_PER_PAGE);

  // Calcular índices para paginación
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProperties = allProperties.slice(startIndex, endIndex);

  // Generar números de página
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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
        <div className="ml-auto text-sm text-zinc-600 dark:text-zinc-400">{allProperties.length} propiedades encontradas</div>
      </div>

      {/* Properties List */}
      <div className="space-y-6">
        {paginatedProperties.map((restaurant) => (
          <article
            key={restaurant.id}
            className="rounded-2xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex flex-col gap-6 lg:flex-row">
              {/* Restaurant Image */}
              <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 lg:h-auto lg:w-64">
                {restaurant.images && restaurant.images.length > 0 ? (
                  <img
                    src={restaurant.images[0].data}
                    alt={restaurant.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      // Si la imagen falla, mostrar el icono
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : null}
                {(!restaurant.images || restaurant.images.length === 0) && (
                  <div className="flex h-full items-center justify-center text-6xl">
                    🏠
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
                      <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                        {restaurant.name}
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {restaurant.propertyType} · {restaurant.listingType} ·{' '}
                        {restaurant.listingType === 'Arriendo'
                          ? `${restaurant.price.toLocaleString('es-CO')} COP / mes`
                          : `${restaurant.price.toLocaleString('es-CO')} COP`}
                      </p>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="mb-3">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{restaurant.details}</p>
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



                {/* Action Buttons */}
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={`/propiedades/${restaurant.id}`}
                    className="rounded-lg bg-zinc-900 px-6 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                  >
                    Ver Detalles
                  </Link>
                  <Link
                    href={`/feedback/new?propertyId=${restaurant.id}`}
                    className="rounded-lg border border-zinc-300 px-6 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
                  >
                    Agenda tu visita
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
          >
            Anterior
          </button>

          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                currentPage === page
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                  : 'border border-zinc-300 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
