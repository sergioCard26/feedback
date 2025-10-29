---
applyTo: '**/*'
description: Instructions for GitHub Copilot to assist with code generation and suggestions.
---

# 🤖 agents.md - Guía para Desarrollo con IA

> **Propósito**: Este documento guía a herramientas de IA (GitHub Copilot, Cursor, etc.) en el desarrollo de nuestra aplicación de feedback para restaurantes.

---

## 📋 Índice

1. Descripción del Proyecto
2. Arquitectura General
3. Estructura de Carpetas
4. Responsabilidades por Capa
5. Modelos de Dominio
6. Convenciones de Código
7. Patrones y Ejemplos
8. Testing
9. Manejo de Errores
10. Antipatrones (Qué NO hacer)
11. Estilo de Código y Estándares

---

## 🎯 Descripción del Proyecto

### ¿Qué es?

Una plataforma web que permite a clientes de restaurantes enviar feedback (quejas, sugerencias, felicitaciones) y genera un ranking público basado en la satisfacción del cliente.

### Funcionalidades Principales

#### Para Clientes (Público)

- Enviar feedback sobre: comida/bebida, atención, estado del lugar, recomendación
- Opción de ser anónimo (se genera nombre aleatorio)
- Ver ranking de restaurantes
- Ver detalles y comentarios de cada restaurante

#### Para Administradores (Dueños)

- Panel privado con dashboard de métricas
- Ver comentarios filtrados por tipo
- Visualizar tendencias y evolución
- Decidir qué comentarios hacer públicos

### MVP (Mínimo Producto Viable)

- ✅ Registrar y listar feedback
- ✅ Calcular puntaje general por restaurante
- ✅ Ranking público de restaurantes
- ✅ Vistas básicas admin/público

---

## 🏗️ Arquitectura General

### Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript (strict mode)
- **Backend**: API REST externa
- **UI**: ShadCN UI + TailwindCSS
- **Validación**: Zod
- **Testing**: Vitest + React Testing Library
- **Estado**: Server Components + Server Actions (server-first approach)
- **HTTP Client**: Fetch API / Axios

### Arquitectura por Capas

```text
┌─────────────────────────────────────────┐
│   UI Layer (Components)                 │
│   - Server Components (data fetching)   │
│   - Client Components (interactivity)   │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   Actions Layer (Server Actions)        │
│   - Validación de inputs (Zod)          │
│   - Manejo de errores para UI           │
│   - Orquestación de services            │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   Services Layer                         │
│   - Lógica de negocio                    │
│   - Validaciones de dominio              │
│   - Acceso a datos                       │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   Mappers Layer                          │
│   - Transformación de DTOs               │
│   - Normalización de datos               │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   Data Layer (API Client)                │
│   - HTTP Client (fetch/axios)            │
│   - API endpoints configuration          │
└──────────────────────────────────────────┘
```

**Flujo de datos**:

```terminal
User Input → Action (valida) → Service (lógica) → Mapper → DB
DB → Mapper → Service → Action → Component → UI
```

---

## 📁 Estructura de Carpetas

```text
src/
├── app/                                # Next.js App Router
│   ├── (admin)/                        # Grupo de rutas admin
│   │   ├── layout.tsx                  # Layout privado con auth
│   │   └── dashboard/
│   │       └── page.tsx                # Server Component
│   │
│   ├── (public)/                       # Grupo de rutas públicas
│   │   ├── layout.tsx                  # Layout público
│   │   ├── page.tsx                    # Home/Landing
│   │   └── restaurants/
│   │       ├── page.tsx                # Lista de restaurantes
│   │       └── [id]/
│   │           └── page.tsx            # Detalle de restaurante
│   │
│   └── api/                            # API Routes (si necesario)
│       └── webhook/
│           └── route.ts
│
├── features/                           # Features modulares
│   ├── feedback/
│   │   ├── components/
│   │   │   ├── FeedbackForm/
│   │   │   │   ├── FeedbackForm.tsx
│   │   │   │   ├── FeedbackForm.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── FeedbackCard/
│   │   │   │   ├── FeedbackCard.tsx
│   │   │   │   ├── FeedbackCard.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── FeedbackList/
│   │   │   └── index.ts                # Barrel export
│   │   │
│   │   ├── services/
│   │   │   ├── feedbackService.ts
│   │   │   ├── feedbackService.test.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── actions/
│   │   │   ├── feedbackActions.ts      # Server Actions
│   │   │   ├── feedbackActions.test.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── mappers/
│   │   │   ├── feedbackMappers.ts
│   │   │   ├── feedbackMappers.test.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── schemas/
│   │   │   ├── feedbackSchemas.ts      # Zod schemas
│   │   │   └── index.ts
│   │   │
│   │   ├── types/
│   │   │   ├── feedback.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── feedbackUtils.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── constants/
│   │   │   ├── feedbackConstants.ts
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts                    # Feature barrel export
│   │
│   ├── restaurants/                    # Mismo patrón
│   │   ├── components/
│   │   ├── services/
│   │   ├── actions/
│   │   ├── mappers/
│   │   ├── schemas/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── constants/
│   │   └── index.ts
│   │
│   └── ranking/                        # Mismo patrón
│       └── [estructura similar]
│
├── common/                             # Código compartido
│   ├── components/                     # UI components genéricos
│   │   ├── ui/                         # ShadCN components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── Button/
│   │   ├── Modal/
│   │   ├── Card/
│   │   └── index.ts
│   │
│   ├── services/
│   │   ├── apiClient.ts                # HTTP client configurado
│   │   ├── authService.ts
│   │   └── index.ts
│   │
│   ├── types/
│   │   ├── api.types.ts
│   │   ├── common.types.ts
│   │   └── index.ts
│   │
│   ├── utils/
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   ├── dateUtils.ts
│   │   └── index.ts
│   │
│   ├── constants/
│   │   ├── apiConstants.ts
│   │   ├── appConstants.ts
│   │   └── index.ts
│   │
│   ├── hooks/
│   │   ├── useToast.ts
│   │   ├── useAuth.ts
│   │   └── index.ts
│   │
│   ├── errors/
│   │   ├── AppError.ts
│   │   ├── errorHandler.ts
│   │   └── index.ts
│   │
│   └── lib/
│       ├── apiClient.ts                # Cliente HTTP configurado
│       └── utils.ts
│
├── context/                            # Contexto para IA
│   ├── database.md
│   ├── ui-guidelines.md
│   ├── domain-model.md
│   └── architecture-decisions.md
│
└── config/
    ├── site.ts
    └── env.ts
```

### Reglas de Organización

1. **Features autocontenidos**: Cada feature debe ser independiente
2. **Common para reutilizables**: Si se usa en 2+ features, va en common
3. **Index.ts como barrels**: Facilita imports limpios
4. **Tests al lado**: `ComponentName.test.tsx` junto a `ComponentName.tsx`
5. **No circular dependencies**: Features NO importan entre sí directamente

---

## 🎯 Responsabilidades por Capa

### 1. Components (UI Layer)

#### Server Components

**Responsabilidad**: Renderizar UI con datos del servidor

```typescript
// ✅ CORRECTO
// app/(public)/restaurants/[id]/page.tsx
import { getRestaurantById } from '@/features/restaurants/services';
import { RestaurantDetail } from '@/features/restaurants/components';

export default async function RestaurantPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const restaurant = await getRestaurantById(params.id);
  
  if (!restaurant) {
    notFound();
  }
  
  return <RestaurantDetail restaurant={restaurant} />;
}
```

**Puede**:

- Llamar services directamente
- Hacer fetch de datos async
- Usar cookies/headers
- Renderizar Client Components

**NO puede**:

- Usar hooks de React (useState, useEffect)
- Manejar eventos (onClick, onChange)
- Usar APIs del navegador

#### Client Components

**Responsabilidad**: Interactividad y estado local

```typescript
// ✅ CORRECTO
'use client';

import { useState } from 'react';
import { submitFeedbackAction } from '@/features/feedback/actions';

export function FeedbackForm({ restaurantId }: { restaurantId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    const result = await submitFeedbackAction(formData);
    setIsSubmitting(false);
    
    if (result.success) {
      toast.success('Feedback enviado');
    }
  }
  
  return (
    <form action={handleSubmit}>
      {/* inputs */}
    </form>
  );
}
```

**Puede**:

- Usar hooks de React
- Manejar eventos
- Estado local (useState, useReducer)
- APIs del navegador

**NO puede**:

- Acceder a DB directamente
- Usar secrets del servidor

### 2. Actions (Server Actions)

**Responsabilidad**: Punto de entrada desde UI al servidor

```typescript
// ✅ CORRECTO
// features/feedback/actions/feedbackActions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { feedbackSchema } from '../schemas';
import { feedbackService } from '../services';
import type { ActionResult } from '@/common/types';

export async function submitFeedbackAction(
  formData: FormData
): Promise<ActionResult<{ id: string }>> {
  // 1. Validar input con Zod
  const parsed = feedbackSchema.safeParse({
    restaurantId: formData.get('restaurantId'),
    type: formData.get('type'),
    rating: Number(formData.get('rating')),
    comment: formData.get('comment'),
    // ... otros campos
  });

  if (!parsed.success) {
    return {
      success: false,
      error: 'Datos inválidos',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // 2. Llamar al service
  try {
    const feedback = await feedbackService.create(parsed.data);
    
    // 3. Revalidar cache si necesario
    revalidatePath(`/restaurants/${parsed.data.restaurantId}`);
    
    return {
      success: true,
      data: { id: feedback.id },
    };
  } catch (error) {
    // 4. Manejar errores
    return handleActionError(error);
  }
}
```

**Debe**:

- Validar TODOS los inputs con Zod
- Retornar siempre `ActionResult<T>` tipado
- Manejar errores y transformarlos a formato user-friendly
- Revalidar cache cuando hay mutaciones
- Ser funciones puras (sin side effects ocultos)

**NO debe**:

- Contener lógica de negocio (eso va en services)
- Acceder a DB directamente
- Lanzar errores sin capturar

### 3. Services

**Responsabilidad**: Lógica de negocio y acceso a datos

```typescript
// ✅ CORRECTO
// features/feedback/services/feedbackService.ts
import { apiClient } from '@/common/lib/apiClient';
import { BusinessError, NotFoundError } from '@/common/errors';
import { feedbackMapper } from '../mappers';
import type { FeedbackInput, Feedback } from '../types';

export const feedbackService = {
  async create(input: FeedbackInput): Promise<Feedback> {
    // Validaciones de negocio
    if (input.rating < 1 || input.rating > 5) {
      throw new BusinessError('Rating debe estar entre 1 y 5');
    }

    // Verificar que el restaurante existe
    const restaurantExists = await this.restaurantExists(input.restaurantId);
    if (!restaurantExists) {
      throw new NotFoundError('Restaurante no encontrado');
    }

    // Generar nombre aleatorio si es anónimo
    const userName = input.isAnonymous 
      ? this.generateRandomName() 
      : input.userName;

    // Preparar payload para API
    const payload = {
      restaurantId: input.restaurantId,
      userName,
      type: input.type,
      rating: input.rating,
      comment: input.comment,
      wouldReturn: input.wouldReturn,
      wouldRecommend: input.wouldRecommend,
      isAnonymous: input.isAnonymous,
    };

    // Enviar a API externa
    const response = await apiClient.post('/feedbacks', payload);

    if (!response.ok) {
      throw new Error('Error al crear feedback');
    }

    const data = await response.json();

    // Mapear a modelo de dominio
    return feedbackMapper.toDomain(data);
  },

  async getByRestaurantId(restaurantId: string): Promise<Feedback[]> {
    const response = await apiClient.get(`/feedbacks?restaurantId=${restaurantId}`);

    if (!response.ok) {
      throw new Error('Error al obtener feedbacks');
    }

    const data = await response.json();
    return data.map(feedbackMapper.toDomain);
  },

  // Métodos privados
  async restaurantExists(id: string): Promise<boolean> {
    try {
      const response = await apiClient.get(`/restaurants/${id}`);
      return response.ok;
    } catch {
      return false;
    }
  },

  generateRandomName(): string {
    const adjectives = ['Feliz', 'Curioso', 'Alegre', 'Simpático'];
    const nouns = ['Comensal', 'Cliente', 'Visitante', 'Gourmet'];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adj} ${noun} ${Math.floor(Math.random() * 1000)}`;
  },
};
```

**Debe**:

- Contener TODA la lógica de negocio
- Validar reglas de dominio
- Realizar cálculos complejos
- Coordinar operaciones de datos
- Lanzar errores tipados (BusinessError, NotFoundError)

**NO debe**:

- Validar inputs del usuario (eso es de actions)
- Manejar FormData o Request
- Retornar mensajes de error para UI

### 4. Mappers

**Responsabilidad**: Transformar datos entre capas

```typescript
// ✅ CORRECTO
// features/feedback/mappers/feedbackMappers.ts
import type { Feedback, FeedbackCard } from '../types';
import type { DbFeedback } from '@/common/types';
import { formatDistanceToNow } from '@/common/utils/dateUtils';

export const feedbackMapper = {
  // DB → Dominio
  toDomain(db: DbFeedback): Feedback {
    return {
      id: db.id,
      restaurantId: db.restaurant_id,
      userName: db.user_name,
      type: db.type as Feedback['type'],
      topic: db.topic as Feedback['topic'],
      rating: db.rating,
      comment: db.comment,
      wouldReturn: db.would_return,
      wouldRecommend: db.would_recommend,
      isAnonymous: db.is_anonymous,
      createdAt: new Date(db.created_at),
    };
  },

  // Dominio → Card UI
  toCard(feedback: Feedback): FeedbackCard {
    return {
      id: feedback.id,
      userName: feedback.userName,
      rating: feedback.rating,
      commentPreview: feedback.comment.length > 100 
        ? `${feedback.comment.substring(0, 100)}...` 
        : feedback.comment,
      typeLabel: this.getTypeLabel(feedback.type),
      timeAgo: formatDistanceToNow(feedback.createdAt),
      isAnonymous: feedback.isAnonymous,
    };
  },

  // Helpers privados
  getTypeLabel(type: Feedback['type']): string {
    const labels = {
      complaint: 'Queja',
      suggestion: 'Sugerencia',
      compliment: 'Felicitación',
    };
    return labels[type];
  },
};
```

**Casos de uso**:

1. **DB → Dominio**: Convertir snake_case a camelCase, parsear fechas
2. **Dominio → UI**: Formatear datos para presentación
3. **API externa → Dominio**: Normalizar datos de terceros
4. **Formulario → Input**: Preparar datos para services

**Debe**:

- Ser funciones puras (sin side effects)
- Tener tests exhaustivos
- Documentar transformaciones complejas

**NO debe**:

- Contener lógica de negocio
- Hacer fetch de datos
- Lanzar errores de negocio

---

## 📊 Modelos de Dominio

### Feedback

```typescript
// features/feedback/types/feedback.types.ts
export type FeedbackType = 'complaint' | 'suggestion' | 'compliment';
export type FeedbackTopic = 'food' | 'service' | 'place' | 'recommendation';

export interface Feedback {
  id: string;
  restaurantId: string;
  userId?: string;              // Opcional si es anónimo
  userName: string;             // Generado si anónimo
  type: FeedbackType;
  topic: FeedbackTopic;
  rating: number;               // 1-5
  comment: string;
  wouldReturn: boolean;
  wouldRecommend: boolean;
  isAnonymous: boolean;
  isPublic: boolean;            // Controlado por admin
  createdAt: Date;
  updatedAt: Date;
}

export interface FeedbackInput {
  restaurantId: string;
  userName?: string;
  type: FeedbackType;
  topic: FeedbackTopic;
  rating: number;
  comment: string;
  wouldReturn: boolean;
  wouldRecommend: boolean;
  isAnonymous: boolean;
}

export interface FeedbackCard {
  id: string;
  userName: string;
  rating: number;
  commentPreview: string;
  typeLabel: string;
  timeAgo: string;
  isAnonymous: boolean;
}
```

### Restaurant

```typescript
// features/restaurants/types/restaurant.types.ts
export interface Restaurant {
  id: string;
  name: string;
  description?: string;
  cuisineType: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  imageUrl?: string;
  
  // Métricas calculadas
  averageRating: number;        // Promedio de ratings
  totalFeedbacks: number;
  positiveFeedbacks: number;    // Felicitaciones
  negativeFeedbacks: number;    // Quejas
  ranking: number;              // Posición en el ranking general
  
  // Metadata
  ownerId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RestaurantCard {
  id: string;
  name: string;
  cuisineType: string;
  averageRating: number;
  totalFeedbacks: number;
  ranking: number;
  imageUrl?: string;
}

export interface RestaurantStats {
  totalFeedbacks: number;
  averageRating: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  feedbacksByType: {
    complaint: number;
    suggestion: number;
    compliment: number;
  };
  wouldReturnPercentage: number;
  wouldRecommendPercentage: number;
  trendLastMonth: 'up' | 'down' | 'stable';
}
```

### User (Admin)

```typescript
// features/auth/types/user.types.ts
export interface User {
  id: string;
  email: string;
  restaurantId: string;
  role: 'admin';
  createdAt: Date;
}
```

### Common Types

```typescript
// common/types/api.types.ts
export interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
}

export interface DbTimestamps {
  created_at: string;
  updated_at: string;
}
```

## Manejo de errores

Basate en este articulo: https://dev.to/nanotime/the-challenge-of-error-handling-in-modern-applications-a-pragmatical-approach-3ioi
el cual describe un enfoque pragmático para el manejo de errores en aplicaciones modernas, abarcando el manejo de errores a nivel de datos y UI, y propone una estructura clara para categorizar y manejar diferentes tipos de errores.

## 📝 Convenciones de Código

### Naming

#### Archivos

- **Componentes**: `PascalCase/ComponentName.tsx`
- **Services/Utils**: `camelCase/fileName.ts`
- **Types**: `camelCase/entityName.types.ts`
- **Tests**: `fileName.test.ts` o `ComponentName.test.tsx`
- **Barrels**: `index.ts`

#### Código

- **Componentes**: `PascalCase` → `FeedbackForm`, `RestaurantCard`
- **Funciones**: `camelCase` → `getFeedbacks`, `calculateRating`
- **Server Actions**: sufijo `Action` → `submitFeedbackAction`
- **Services**: objeto exportado → `feedbackService.create()`
- **Tipos/Interfaces**: `PascalCase` → `Feedback`, `ActionResult`
- **Constantes**: `UPPER_SNAKE_CASE` → `MAX_RATING`, `API_URL`
- **Hooks**: prefijo `use` → `useFeedback`, `useToast`
- **Utilities**: descriptivos → `formatDate`, `truncateText`

### Imports

**Orden**:

```typescript
// 1. React/Next
import { useState } from 'react';
import { notFound } from 'next/navigation';

// 2. Librerías externas
import { z } from 'zod';
import { format } from 'date-fns';

// 3. Features
import { feedbackService } from '@/features/feedback/services';
import { FeedbackCard } from '@/features/feedback/components';

// 4. Common
import { Button } from '@/common/components/ui';
import { formatDate } from '@/common/utils';

// 5. Relative imports
import { FeedbackForm } from './FeedbackForm';
import { calculateAverage } from '../utils';

// 6. Types
import type { Feedback } from '@/features/feedback/types';
import type { ActionResult } from '@/common/types';

// 7. Styles (si aplica)
import styles from './Component.module.css';
```

### TypeScript

**Reglas estrictas**:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

**Preferencias**:

```typescript
// ✅ CORRECTO: Interfaces para objetos
interface User {
  id: string;
  name: string;
}

// ✅ CORRECTO: Types para unions/aliases
type Status = 'active' | 'inactive';
type UserId = string;

// ✅ CORRECTO: Tipos explícitos en parámetros
function getUser(id: string): Promise<User | null> {
  // ...
}

// ✅ CORRECTO: Tipos en arrow functions
const calculateTotal = (items: Item[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// ❌ INCORRECTO: any
function processData(data: any) { } // ❌

// ✅ CORRECTO: unknown + type guard
function processData(data: unknown) {
  if (typeof data === 'string') {
    // ...
  }
}
```

### Comentarios

**Cuándo comentar**:

```typescript
// ✅ CORRECTO: Explicar "por qué"
// Usamos setTimeout para evitar race condition con el DOM
setTimeout(() => focusInput(), 0);

// ✅ CORRECTO: Algoritmos complejos
// Implementación del algoritmo de ranking ponderado:
// score = (positive * 2) - (negative * 1) + (suggestions * 0.5)
const score = calculateWeightedScore(feedbacks);

// ✅ CORRECTO: Workarounds temporales
// TODO: Remover cuando Next.js 15.1 solucione el bug #12345
// @ts-ignore
const data = await unstable_cache(fetchData)();

// ❌ INCORRECTO: Comentar lo obvio
// Crea un usuario
const user = createUser(); // ❌
```

**JSDoc para funciones públicas**:

```typescript
/**
 * Calcula el ranking de un restaurante basado en sus feedbacks.
 * 
 * @param restaurantId - ID del restaurante
 * @param options - Opciones de cálculo
 * @returns Objeto con el ranking y métricas relacionadas
 * @throws {NotFoundError} Si el restaurante no existe
 * 
 * @example
 * const ranking = await calculateRanking('rest-123', { includeStats: true });
 */
export async function calculateRanking(
  restaurantId: string,
  options?: RankingOptions
): Promise<RestaurantRanking> {
  // ...
}
```

### Formato

Usar **Prettier** con esta configuración:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "always"
}
```

---

## 🔧 Patrones y Ejemplos

### Pattern: Create Feature

**Checklist completo**:

```text
✅ 1. Crear estructura de carpetas
✅ 2. Definir tipos en types/
✅ 3. Crear schema de validación en schemas/
✅ 4. Implementar service en services/
✅ 5. Crear mappers en mappers/
✅ 6. Implementar actions en actions/
✅ 7. Crear componentes en components/
✅ 8. Agregar tests para cada archivo
✅ 9. Crear barrel exports (index.ts)
✅ 10. Documentar en context/ si es complejo
```

## Estilo de Código y Estándares

### Principios Generales

- Escribir código limpio, mantenible y auto-documentado
- Priorizar legibilidad sobre complejidad
- Mantener funciones pequeñas y enfocadas (responsabilidad única)
- Aplicar principios SOLID donde sea aplicable
- Seguir el principio DRY (Don't Repeat Yourself)
- Preferir composición sobre herencia
- Priorizar técnicas de escalamiento y mantenibilidad

### Comentarios

- Escribir comentarios en inglés únicamente
- Mantener comentarios cortos y concisos
- Comentar solo cuando la intención del código no sea inmediatamente clara
- Evitar comentarios redundantes que simplemente repiten el código
- Usar JSDoc para funciones públicas y tipos complejos
- Preferir código auto-explicativo sobre comentarios excesivos

```typescript
// ❌ Mal: Comentario redundante
// Obtener usuario por id
const user = getUserById(id);

// ✅ Bien: El comentario agrega valor
// Retry failed requests up to 3 times with exponential backoff
const data = await fetchWithRetry(url, { maxRetries: 3 });
```

### Funciones y Métodos

- Mantener funciones pequeñas (idealmente < 20 líneas)
- Cada función debe tener un único propósito bien definido
- Usar nombres descriptivos que indiquen su propósito
- Limitar parámetros de función (máx 3-4, usar objetos para más)
- Retornar temprano para evitar anidamiento profundo
- Evitar efectos secundarios en funciones puras

```typescript
// ❌ Mal: La función hace demasiado
function processUserData(user: User) {
  validateUser(user);
  saveToDatabase(user);
  sendEmail(user);
  logActivity(user);
}

// ✅ Bien: Responsabilidad única
function validateUser(user: User): ValidationResult {
  // Solo lógica de validación
}
```

### Mejores Prácticas de TypeScript

- Habilitar modo estricto en tsconfig.json
- Evitar usar tipo `any` - usar `unknown` si el tipo es realmente desconocido
- Definir tipos de retorno explícitos para funciones
- Usar inferencia de tipos donde mejore la legibilidad
- Preferir interfaces para formas de objetos, types para uniones/intersecciones
- Usar uniones discriminadas para manejo de estado
- Aprovechar tipos de utilidad (Partial, Pick, Omit, etc.)

```typescript
// ✅ Bien: Tipos explícitos
interface UserProps {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<UserProps | null> {
  // Implementación
}
```

### Convenciones de React y Next.js

- Usar componentes funcionales con hooks
- Preferir server components por defecto (usar 'use client' solo cuando sea necesario)
- Mantener componentes pequeños y componibles
- Extraer hooks personalizados para lógica reutilizable
- Usar tipado apropiado de props con TypeScript
- Implementar error boundaries para manejo de errores
- Seguir convenciones de enrutamiento basado en archivos de Next.js
- Usar importaciones dinámicas para code splitting

```typescript
// ✅ Bien: Componente pequeño y tipado
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn-${variant}`}>
      {label}
    </button>
  );
}
```

### Convenciones de Nomenclatura

- Usar PascalCase para componentes y clases
- Usar camelCase para variables, funciones y métodos
- Usar UPPER_SNAKE_CASE para constantes
- Usar nombres descriptivos que revelen intención
- Prefijo is/has/should para variables booleanas
- Prefijo handle para manejadores de eventos

```typescript
// ✅ Buena nomenclatura
const MAX_RETRY_ATTEMPTS = 3;
const isUserActive = true;
const hasPermission = checkPermission();

function handleSubmit() {}
function shouldRenderContent(): boolean {}
```

### Manejo de Errores

- Siempre manejar errores explícitamente
- Usar try-catch para operaciones asíncronas
- Proporcionar mensajes de error significativos
- Crear clases de error personalizadas cuando sea apropiado
- Registrar errores apropiadamente (evitar console.log en producción)
- Usar error boundaries en React

```typescript
// ✅ Bien: Manejo explícito de errores
async function fetchUserData(id: string): Promise<User> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    logger.error('Error fetching user:', error);
    throw error;
  }
}
```

### Testing

- Escribir tests unitarios para lógica de negocio
- Usar nombres descriptivos para tests
- Seguir patrón AAA (Arrange, Act, Assert)
- Mockear dependencias externas
- Apuntar a cobertura de tests significativa, no al 100%

### Rendimiento

- Memoizar cálculos costosos con useMemo
- Optimizar re-renders con useCallback y memo
- Usar importaciones dinámicas para code splitting
- Implementar estados de carga apropiados
- Optimizar imágenes con next/image
- Minimizar tamaño del bundle

### Seguridad

- Nunca commitear datos sensibles o API keys
- Validar y sanitizar inputs de usuario
- Usar variables de entorno para configuración
- Implementar autenticación y autorización apropiadas
- Seguir guías de seguridad OWASP

### Git y Control de Versiones

- Escribir mensajes de commit claros y concisos
- Usar formato de conventional commits
- Mantener commits atómicos y enfocados
- Crear feature branches para trabajo nuevo
- Revisar código antes de mergear

```bash
# Formato de mensajes de commit
feat: agregar autenticación de usuario
fix: resolver problema de redirección en login
refactor: simplificar lógica de manejo de errores
docs: actualizar documentación de API
```

## Desarrollo de APIs

- Usar convenciones RESTful o GraphQL consistentemente
- Implementar códigos de estado HTTP apropiados
- Validar datos de request con schemas
- Manejar rate limiting
- Documentar endpoints de API
- Versionar tus APIs

## Accesibilidad

- Usar elementos HTML semánticos
- Proporcionar texto alt para imágenes
- Asegurar que la navegación por teclado funcione
- Mantener jerarquía apropiada de encabezados
- Probar con lectores de pantalla
- Seguir guías WCAG

## Documentación

- Mantener README.md actualizado
- Documentar algoritmos complejos y lógica de negocio
- Mantener documentación de API
- Actualizar docs cuando el código cambie
- Incluir instrucciones de setup y deployment