// Utility para manejar propiedades en localStorage
// Este archivo se ejecuta en el cliente

export interface PropertyImage {
  id: string;
  data: string; // base64
  name: string;
}

export interface Property {
  id: string;
  name: string;
  propertyType: 'Apartaestudio' | 'Casa' | 'Apartamento' | 'Lote';
  listingType: 'Arriendo' | 'Venta';
  price: number;
  address: string;
  details: string;
  description: string;
  features: string[];
  images: PropertyImage[];
  hasPromotion: boolean;
  promotionText?: string;
  ranking: number;
  createdAt: string;
}

const STORAGE_KEY = 'inmobiliaria_properties';

export function getStoredProperties(): Property[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
}

export function saveProperty(property: Property): void {
  if (typeof window === 'undefined') return;
  
  try {
    const properties = getStoredProperties();
    const existingIndex = properties.findIndex((p) => p.id === property.id);
    
    if (existingIndex >= 0) {
      properties[existingIndex] = property;
    } else {
      properties.push(property);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function deleteProperty(propertyId: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const properties = getStoredProperties();
    const filtered = properties.filter((p) => p.id !== propertyId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting from localStorage:', error);
  }
}

export function getPropertyById(id: string): Property | undefined {
  const properties = getStoredProperties();
  return properties.find((p) => p.id === id);
}

export function generateId(): string {
  return `prop_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}

export function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
