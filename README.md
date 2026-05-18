# Sistema de Gestion de Estibas

Proyecto final construido con React, JavaScript, Vite, Firebase Auth y Firestore.

## Integrantes

- Alejandro Estrada Zuluaga
- Kristian Castrillón

## Propuesta gráfica

Figma: [Propuesta gráfica definitiva](https://www.figma.com/design/2Fp6nwMgql4wBuv6x3SmuT/Propuesta-grafica-definitiva?node-id=0-1&t=ph44yN9wVQI53HBR-1)

## Despliegue

Vercel: pendiente por agregar el enlace final cuando el proyecto quede publicado.

## Repositorio

GitHub: [Proyecto_Datos](https://github.com/AlejandroEstrada1/Proyecto_Datos)

## Estado del proyecto

- Login, registro y cierre de sesion reales con Firebase Auth.
- Rutas publicas y privadas con React Router.
- Dashboard operativo.
- CRUD de pedidos conectado a Firestore.
- CRUD de inventario en tiempo real con Firestore.
- Busqueda inteligente y autocomplete de productos.
- Plan del dia con priorizacion de pedidos.
- Optimizacion de rutas de despacho.
- Estructuras de datos implementadas en JavaScript y conectadas a funcionalidades reales.

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Firebase

La integracion usa variables de entorno de Vite. Copia `.env.example` como `.env.local` y completa los valores del proyecto Firebase:

```env
VITE_FIREBASE_API_KEY=TU_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=TU_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=TU_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=TU_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=TU_MESSAGING_ID
VITE_FIREBASE_APP_ID=TU_APP_ID
VITE_ENABLE_ROUTE_PREVIEW=false
```

## Rutas principales

- `/login`: inicio de sesion.
- `/registro`: creacion de cuenta.
- `/app/dashboard`: panel general.
- `/app/pedidos`: gestion de pedidos.
- `/app/inventario`: gestion de inventario.
- `/app/plan-dia`: priorizacion diaria.
- `/app/rutas-despacho`: optimizacion de rutas.

## Colecciones Firestore

### `orders`

- `orderCode`: codigo visible del pedido.
- `customerName`: cliente.
- `productName`: producto solicitado.
- `quantity`: cantidad de estibas.
- `destination`: destino de despacho.
- `deliveryDate`: fecha requerida.
- `priority`: `baja`, `media`, `alta` o `urgente`.
- `status`: `pendiente`, `en_proceso`, `despachado` o `cancelado`.
- `queuedAt`: numero usado para ordenar la cola FIFO.
- `createdAt` y `updatedAt`: marcas de tiempo de Firestore.

### `inventory`

- `sku`: codigo del producto.
- `productName`: nombre del producto.
- `category`: categoria.
- `stock`: existencia actual.
- `minStock`: existencia minima.
- `unit`: unidad de medida.
- `location`: ubicacion en bodega.
- `supplier`: proveedor.
- `status`: `disponible`, `bajo_stock` o `agotado`.
- `createdAt` y `updatedAt`: marcas de tiempo de Firestore.

## Estructuras de datos

- `Cola`: flujo FIFO de pedidos pendientes en el modulo de pedidos.
- `Pila`: deshacer la ultima accion de inventario.
- `HeapPrioridad`: priorizar pedidos urgentes en el plan del dia.
- `ArbolTrie`: busqueda/autocomplete de productos en inventario.
- `Grafo`: red de despacho con camino mas corto para rutas.

## Documento final

El documento de alcance, tecnologias, estructura del proyecto y estructuras de datos esta en `docs/DOCUMENTO_FINAL.md`.
