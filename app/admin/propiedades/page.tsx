'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  getStoredProperties,
  saveProperty,
  deleteProperty,
  generateId,
  imageToBase64,
  type Property,
  type PropertyImage,
} from '../utils/propertyStorage';

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<Property>({
    id: '',
    name: '',
    propertyType: 'Apartamento',
    listingType: 'Arriendo',
    price: 0,
    address: '',
    details: '',
    description: '',
    features: [],
    images: [],
    hasPromotion: false,
    promotionText: '',
    ranking: 0,
    createdAt: new Date().toISOString(),
  });

  const [featureInput, setFeatureInput] = useState('');

  // Cargar propiedades al montar
  useEffect(() => {
    const stored = getStoredProperties();
    setProperties(stored);
  }, []);

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      propertyType: 'Apartamento',
      listingType: 'Arriendo',
      price: 0,
      address: '',
      details: '',
      description: '',
      features: [],
      images: [],
      hasPromotion: false,
      promotionText: '',
      ranking: 0,
      createdAt: new Date().toISOString(),
    });
    setEditingId(null);
    setFeatureInput('');
    setShowForm(false);
  };

  // Editar propiedad
  const handleEdit = (property: Property) => {
    setFormData(property);
    setEditingId(property.id);
    setShowForm(true);
  };

  // Guardar propiedad
  const handleSave = () => {
    if (!formData.name || !formData.address || formData.price <= 0) {
      alert('Por favor completa los campos requeridos');
      return;
    }

    const toSave: Property = {
      ...formData,
      id: editingId || generateId(),
      ranking: editingId ? formData.ranking : properties.length + 1,
      createdAt: editingId ? formData.createdAt : new Date().toISOString(),
    };

    saveProperty(toSave);
    const updated = getStoredProperties();
    setProperties(updated);
    resetForm();
  };

  // Eliminar propiedad
  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro que deseas eliminar esta propiedad?')) {
      deleteProperty(id);
      const updated = getStoredProperties();
      setProperties(updated);
    }
  };

  // Cargar imágenes
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    setLoading(true);
    const newImages: PropertyImage[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const base64 = await imageToBase64(file);
        newImages.push({
          id: generateId(),
          data: base64,
          name: file.name,
        });
      } catch (error) {
        console.error(`Error cargando ${file.name}:`, error);
      }
    }

    setFormData({
      ...formData,
      images: [...formData.images, ...newImages],
    });
    setLoading(false);
  };

  // Eliminar imagen
  const handleRemoveImage = (imageId: string) => {
    setFormData({
      ...formData,
      images: formData.images.filter((img) => img.id !== imageId),
    });
  };

  // Agregar característica
  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()],
      });
      setFeatureInput('');
    }
  };

  // Eliminar característica
  const handleRemoveFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-bold text-zinc-900 dark:text-white">
            Gestión de Propiedades
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Crea, edita y elimina propiedades desde este panel
          </p>
        </div>
        <Link
          href="/"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
        >
          Volver a Inicio
        </Link>
      </div>

      {/* Botón para crear nueva propiedad */}
      {!showForm && (
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="mb-8 rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700"
        >
          + Nueva Propiedad
        </button>
      )}

      {/* Formulario */}
      {showForm && (
        <div className="mb-12 rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
            {editingId ? 'Editar Propiedad' : 'Nueva Propiedad'}
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Nombre */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Nombre de la propiedad *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                placeholder="Ej: Casa La Toscana"
              />
            </div>

            {/* Tipo de inmueble */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Tipo de inmueble *
              </label>
              <select
                value={formData.propertyType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    propertyType: e.target.value as any,
                  })
                }
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              >
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Apartaestudio">Apartaestudio</option>
                <option value="Lote">Lote</option>
              </select>
            </div>

            {/* Tipo de operación */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Operación *
              </label>
              <select
                value={formData.listingType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    listingType: e.target.value as any,
                  })
                }
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              >
                <option value="Arriendo">Arriendo</option>
                <option value="Venta">Venta</option>
              </select>
            </div>

            {/* Precio */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Precio (COP) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                placeholder="Ej: 1600000"
              />
            </div>

            {/* Dirección */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Dirección *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                placeholder="Ej: Carrera 21 #30-10, Barrio Chipre"
              />
            </div>

            {/* Detalles (resumen corto) */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Detalles (resumen corto) *
              </label>
              <textarea
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                placeholder="Ej: 3 alcobas, 2 baños, 180m² construidos"
                rows={2}
              />
            </div>

            {/* Descripción (larga) */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Descripción completa *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                placeholder="Descripción detallada de la propiedad..."
                rows={4}
              />
            </div>

            {/* Promoción */}
            <div>
              <label className="mb-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.hasPromotion}
                  onChange={(e) => setFormData({ ...formData, hasPromotion: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  ¿Tiene promoción?
                </span>
              </label>
            </div>

            {formData.hasPromotion && (
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Texto de promoción
                </label>
                <input
                  type="text"
                  value={formData.promotionText || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, promotionText: e.target.value })
                  }
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  placeholder="Ej: Mes gratis al firmar 1 año"
                />
              </div>
            )}
          </div>

          {/* Características */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Características
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddFeature();
                  }
                }}
                className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                placeholder="Ej: 3 alcobas"
              />
              <button
                onClick={handleAddFeature}
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
              >
                Agregar
              </button>
            </div>

            {formData.features.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {feature}
                    <button
                      onClick={() => handleRemoveFeature(index)}
                      className="ml-1 font-bold hover:text-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Imágenes */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Imágenes (puedes cargar varias)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              disabled={loading}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />

            {formData.images.length > 0 && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {formData.images.map((image) => (
                  <div key={image.id} className="relative overflow-hidden rounded-lg">
                    <img
                      src={image.data}
                      alt={image.name}
                      className="h-32 w-full object-cover"
                    />
                    <button
                      onClick={() => handleRemoveImage(image.id)}
                      className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-sm text-white hover:bg-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700 disabled:opacity-50"
            >
              {editingId ? 'Guardar cambios' : 'Crear propiedad'}
            </button>
            <button
              onClick={resetForm}
              className="rounded-lg border border-zinc-300 px-6 py-3 font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Listado de propiedades */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
          Propiedades ({properties.length})
        </h2>

        {properties.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-zinc-600 dark:text-zinc-400">
              No hay propiedades aún. Crea una nueva para comenzar.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {properties.map((property) => (
              <div
                key={property.id}
                className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                {/* Imagen preview */}
                {property.images.length > 0 && (
                  <img
                    src={property.images[0].data}
                    alt={property.name}
                    className="mb-4 h-40 w-full rounded-lg object-cover"
                  />
                )}

                <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white">
                  {property.name}
                </h3>
                <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                  {property.propertyType} • {property.listingType}
                </p>

                <p className="mb-4 text-lg font-bold text-green-600">
                  {property.listingType === 'Arriendo'
                    ? `${property.price.toLocaleString('es-CO')} COP/mes`
                    : `${property.price.toLocaleString('es-CO')} COP`}
                </p>

                <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                  📍 {property.address}
                </p>

                {/* Imágenes count */}
                <p className="mb-4 text-xs text-zinc-500 dark:text-zinc-500">
                  {property.images.length} imagen{property.images.length !== 1 ? 'es' : ''}
                </p>

                {/* Botones */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(property)}
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
