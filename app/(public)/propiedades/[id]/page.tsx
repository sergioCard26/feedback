'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getStoredProperties, type Property } from '@/app/admin/utils/propertyStorage';

// Mock data - propiedades en Manizales
const mockProperties = [
  {
    id: '1',
    name: 'Apartaestudio Edificio Tamanaco',
    propertyType: 'Apartaestudio',
    listingType: 'Arriendo',
    price: 850000, // COP / mes
    ranking: 1,
    address: 'Centro, Manizales',
    //imageUrl: 'https://via.placeholder.com/800x600?text=Apartaestudio+Tamanaco',
    hasPromotion: false,
    details: 'Estudio de 35m², piso 8, amoblado, acceso a gimnasio y zona común. Ideal para estudiantes o profesionales.',
    description: 'Hermoso apartaestudio ubicado en el corazón del centro de Manizales, en el prestigioso Edificio Tamanaco. Este inmueble ofrece todas las comodidades necesarias para una estancia cómoda y económica.',
    features: [
      '35 m² construidos',
      'Piso 8',
      'Amoblado',
      'Acceso a gimnasio',
      'Zona común',
      'Parqueadero incluido',
      'Servicios públicos incluidos',
    ],
  },
  {
    id: '2',
    name: 'Casa La Toscana',
    propertyType: 'Casa',
    listingType: 'Venta',
    price: 420000000, // COP
    ranking: 2,
    address: 'Carrera 21 #30-10, Barrio Chipre, Manizales',
    //imageUrl: 'https://via.placeholder.com/800x600?text=Casa+La+Toscana',
    hasPromotion: false,
    details: '3 alcobas, 2 baños, 180m² construidos, lote 250m², garaje para 2 autos, patio trasero.',
    description: 'Magnífica casa ubicada en Barrio Chipre, una de las zonas más exclusivas de Manizales. Esta propiedad combina elegancia arquitectónica con funcionalidad, perfecta para familias que desean vivir con comodidad.',
    features: [
      '3 alcobas',
      '2 baños',
      '180 m² construidos',
      'Lote 250 m²',
      'Garaje para 2 autos',
      'Patio trasero',
      'Cocina moderna',
      'Sala comedor integrada',
    ],
  },
  {
    id: '3',
    name: 'Apartamento Puertas del Sol',
    propertyType: 'Apartamento',
    listingType: 'Arriendo',
    price: 1600000, // COP / mes
    ranking: 3,
    address: 'Transversal 4 #18-60, Barrio Puertas del Sol, Manizales',
    //imageUrl: 'https://via.placeholder.com/800x600?text=Apartamento+Puertas+del+Sol',
    hasPromotion: true,
    promotionText: 'Mes de administración gratis al firmar contrato a 1 año',
    details: '2 alcobas, 2 baños, 95m² construidos, piso 6, balcón con vista, parqueadero incluido.',
    description: 'Apartamento moderno y luminoso en la reconocida urbanización Puertas del Sol. Ubicación privilegiada con acceso a comercios, restaurantes y espacios verdes. Perfecto para familias pequeñas o parejas.',
    features: [
      '2 alcobas',
      '2 baños',
      '95 m² construidos',
      'Piso 6',
      'Balcón con vista',
      'Parqueadero incluido',
      'Aire acondicionado',
      'Closets amplios',
    ],
  },
  {
    id: '4',
    name: 'Lote La Enea',
    propertyType: 'Lote',
    listingType: 'Venta',
    price: 95000000, // COP
    ranking: 4,
    address: 'Vereda La Enea, sector Camino Real, Manizales',
    //imageUrl: 'https://via.placeholder.com/800x600?text=Lote+La+Enea',
    hasPromotion: false,
    details: 'Lote de 5000m², con servicios públicos disponibles (agua, luz). Excelente para proyecto residencial o comercial.',
    description: 'Excelente oportunidad de inversión. Lote de gran extensión ubicado en la Vereda La Enea, sector Camino Real. Ideal para proyectos residenciales, comerciales o de recreación.',
    features: [
      '5000 m²',
      'Servicios públicos disponibles',
      'Acceso por vía principal',
      'Topografía variable',
      'Potencial de desarrollo alto',
      'Zona de expansión urbana',
    ],
  },
];

export default function PropertyDetailPage() {
  const params = useParams();
  const propertyId = params.id as string;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Primero buscar en localStorage
    const storedProps = getStoredProperties();
    const foundProp = storedProps.find((p) => p.id === propertyId);

    if (foundProp) {
      setProperty(foundProp);
    } else {
      // Fallback a mock data
      const mockProp = mockProperties.find((p: any) => p.id === propertyId) as any;
      if (mockProp) {
        setProperty({
          ...mockProp,
          description: mockProp.description || mockProp.details,
          images: mockProp.imageUrl ? [{ id: '1', data: mockProp.imageUrl, name: 'image' }] : [],
          createdAt: new Date().toISOString(),
        } as Property);
      }
    }
    setLoading(false);
  }, [propertyId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-zinc-600 dark:text-zinc-400">Cargando...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-white">
          Propiedad no encontrada
        </h1>
        <p className="mb-8 text-zinc-600 dark:text-zinc-400">
          Lo sentimos, la propiedad que buscas no existe.
        </p>
        <Link
          href="/propiedades"
          className="inline-block rounded-lg bg-zinc-900 px-8 py-3 font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
        >
          Volver a propiedades
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
        <Link href="/propiedades" className="hover:text-zinc-900 dark:hover:text-white">
          Propiedades
        </Link>
        <span>/</span>
        <span className="text-zinc-900 dark:text-white">{property.name}</span>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Image Section */}
        <div className="lg:col-span-2">
          <div className="relative mb-6 h-96 w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
            {property.images && property.images.length > 0 ? (
              <img
                src={property.images[0].data}
                alt={property.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-6xl">
                🏠
              </div>
            )}
            {property.hasPromotion && property.promotionText && (
              <div className="absolute bottom-4 left-4 inline-block rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                🎉 {property.promotionText}
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            {/* Price */}
            <div className="mb-6">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Precio</p>
              <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                {property.listingType === 'Arriendo'
                  ? `${property.price.toLocaleString('es-CO')} COP`
                  : `${property.price.toLocaleString('es-CO')} COP`}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {property.listingType === 'Arriendo' ? 'por mes' : 'valor total'}
              </p>
            </div>

            {/* Property Type and Listing Type */}
            <div className="mb-6 border-t border-zinc-200 pt-6 dark:border-zinc-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Tipo de inmueble</p>
                  <p className="font-semibold text-zinc-900 dark:text-white">
                    {property.propertyType}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Operación</p>
                  <p className="font-semibold text-zinc-900 dark:text-white">
                    {property.listingType}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
                Contactar Asesor
              </button>
              <Link
                href={`/feedback/new?propertyId=${property.id}`}
                className="block rounded-lg border border-zinc-300 px-6 py-3 text-center font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
              >
                Dejar Reseña
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="mt-12">
        {/* Address */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">Ubicación</h2>
          <div className="flex items-start gap-3">
            <span className="mt-1 text-2xl">📍</span>
            <div>
              <p className="text-lg font-semibold text-zinc-900 dark:text-white">
                {property.address}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">Descripción</h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">Características</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {property.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="text-xl">✓</span>
                <span className="text-zinc-700 dark:text-zinc-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-12 text-center">
        <Link
          href="/propiedades"
          className="inline-block rounded-lg border border-zinc-300 px-8 py-3 font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
        >
          ← Volver a propiedades
        </Link>
      </div>
    </div>
  );
}
