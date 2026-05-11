# Sistema de Gestion de Estibas

Proyecto final construido con React, JavaScript, Vite, Firebase Auth y Firestore.

## Estado actual

- Paso 1 completado: configuracion inicial, estructura de carpetas y rutas base.
- Paso 2 completado: integracion limpia de Firebase Auth y Firestore.
- Paso 3 completado: login, registro, cierre de sesion y rutas privadas con Firebase Auth.
- Paso 4 completado: CRUD de pedidos con Firestore y Cola para flujo FIFO.
- Paso 5 completado: CRUD de inventario en tiempo real con Firestore y busqueda con Arbol Trie.

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

Servicios preparados:

- `src/config/firebase.js`: inicializa Firebase, Auth y Firestore.
- `src/servicios/firebase/servicioAutenticacion.js`: funciones base para Auth.
- `src/servicios/firebase/servicioFirestore.js`: referencias base para colecciones de Firestore.
- `src/contexto/ContextoAutenticacion.jsx`: escucha la sesion activa de Firebase.

Rutas de autenticacion:

- `/login`: inicio de sesion real con Firebase Auth.
- `/registro`: registro real con correo y contrasena.
- `/app/dashboard`: ruta privada protegida por sesion.

## Pedidos

Coleccion Firestore: `orders`

Campos principales:

- `orderCode`: codigo visible del pedido.
- `customerName`: cliente.
- `productName`: producto solicitado.
- `quantity`: cantidad de estibas.
- `destination`: destino de despacho.
- `deliveryDate`: fecha requerida.
- `status`: `pendiente`, `en_proceso`, `despachado` o `cancelado`.
- `queuedAt`: numero usado para ordenar la cola FIFO.
- `createdAt` y `updatedAt`: marcas de tiempo de Firestore.

Estructura conectada:

- `Cola` en `src/estructuras/Cola.js`.
- Los pedidos con estado `pendiente` se ordenan por `queuedAt`.
- El boton "Tomar siguiente pedido" mueve el primer pedido de la cola a `en_proceso`.

## Inventario

Coleccion Firestore: `inventory`

Campos principales:

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

Estructura conectada:

- `ArbolTrie` en `src/estructuras/ArbolTrie.js`.
- El inventario se escucha con `onSnapshot`, por eso los cambios se reflejan en tiempo real.
- El autocomplete indexa nombre, codigo y categoria del producto.

## Alcance actual

- Autenticacion real con Firebase Auth.
- Dashboard operativo.
- CRUD de pedidos.
- CRUD de inventario en tiempo real con Firestore.
- Busqueda inteligente de productos con Arbol Trie.

Fuera del alcance actual:

- Plan del dia.
- Stack para deshacer acciones.
- Heap/cola de prioridad para pedidos urgentes.
- Grafos y optimizacion de rutas.
- Despliegue final.
