# Configuración de Variables de Entorno

Este documento explica cómo configurar las variables de entorno para la aplicación SOA Sales Front.

## Archivos de Configuración

### 1. env.example
Este archivo contiene un template con todas las variables de entorno necesarias. Para usar:

1. Copia el archivo `env.example` a `.env.local`:
```bash
cp env.example .env.local
```

2. Edita `.env.local` con tus valores específicos.

### 2. src/config/env.config.ts
Este archivo centraliza la configuración de las variables de entorno y proporciona funciones helper.

## Variables de Entorno Disponibles

### Configuración de API
- `NEXT_PUBLIC_API_BASE_URL`: URL base de la API (default: http://localhost:8000/api)
- `NEXT_PUBLIC_API_VERSION`: Versión de la API (default: v1)

### Endpoints de Autenticación
- `NEXT_PUBLIC_AUTH_ENDPOINT`: Endpoint base de autenticación (default: /auth)
- `NEXT_PUBLIC_LOGIN_ENDPOINT`: Endpoint de login (default: /auth/login)
- `NEXT_PUBLIC_REGISTER_ENDPOINT`: Endpoint de registro (default: /auth/register)
- `NEXT_PUBLIC_LOGOUT_ENDPOINT`: Endpoint de logout (default: /auth/logout)
- `NEXT_PUBLIC_REFRESH_TOKEN_ENDPOINT`: Endpoint de refresh token (default: /auth/refresh)

### Endpoints de Ventas
- `NEXT_PUBLIC_SALES_ENDPOINT`: Endpoint de ventas (default: /sales)
- `NEXT_PUBLIC_PRODUCTS_ENDPOINT`: Endpoint de productos (default: /products)
- `NEXT_PUBLIC_CUSTOMERS_ENDPOINT`: Endpoint de clientes (default: /customers)

### Configuración JWT
- `NEXT_PUBLIC_JWT_STORAGE_KEY`: Clave para almacenar el token JWT (default: auth_token)
- `NEXT_PUBLIC_REFRESH_TOKEN_STORAGE_KEY`: Clave para almacenar el refresh token (default: refresh_token)

### Configuración de API
- `NEXT_PUBLIC_API_TIMEOUT`: Timeout de las peticiones API en ms (default: 10000)
- `NEXT_PUBLIC_DEFAULT_HEADERS`: Headers por defecto (default: {"Content-Type": "application/json"})

### Configuración de Entorno
- `NODE_ENV`: Entorno de ejecución (development/production)
- `NEXT_PUBLIC_DEBUG_MODE`: Modo debug (true/false)

### Servicios Externos (Opcionales)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Clave pública de Stripe
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`: ID de Google Analytics
- `NEXT_PUBLIC_SENTRY_DSN`: DSN de Sentry para monitoreo de errores

## Uso en el Código

### Importar la configuración
```typescript
import { env, getApiUrl, getAuthUrl, getSalesUrl } from '@/config/env.config';
```

### Ejemplos de uso
```typescript
// Obtener URL completa de login
const loginUrl = getAuthUrl('/login');
// Resultado: http://localhost:8000/api/v1/auth/login

// Obtener URL de productos
const productsUrl = getSalesUrl('/products');
// Resultado: http://localhost:8000/api/v1/sales/products

// Acceder a variables directamente
const apiTimeout = env.API_TIMEOUT;
const isDebugMode = env.DEBUG_MODE;
```

## Configuración por Entorno

### Desarrollo (.env.local)
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_DEBUG_MODE=true
```

### Producción (.env.production)
```bash
NEXT_PUBLIC_API_BASE_URL=https://api.tudominio.com/api
NEXT_PUBLIC_DEBUG_MODE=false
```

## Notas Importantes

1. **NEXT_PUBLIC_**: Todas las variables que necesiten ser accesibles en el cliente deben tener el prefijo `NEXT_PUBLIC_`.

2. **Seguridad**: Nunca commits archivos `.env.local` o `.env.production` al repositorio.

3. **Valores por defecto**: El archivo `env.config.ts` proporciona valores por defecto para todas las variables.

4. **TypeScript**: Las variables están tipadas para mejor experiencia de desarrollo.

## Troubleshooting

### Variable no encontrada
Si una variable no se está leyendo correctamente:
1. Verifica que el archivo `.env.local` existe
2. Reinicia el servidor de desarrollo
3. Verifica que la variable tiene el prefijo `NEXT_PUBLIC_` si se usa en el cliente

### URLs incorrectas
Si las URLs de la API no son correctas:
1. Verifica `NEXT_PUBLIC_API_BASE_URL`
2. Verifica `NEXT_PUBLIC_API_VERSION`
3. Usa las funciones helper `getApiUrl()`, `getAuthUrl()`, `getSalesUrl()` 