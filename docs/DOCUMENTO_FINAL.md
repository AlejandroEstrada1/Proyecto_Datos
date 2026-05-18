# Documento final - Sistema de Gestion de Estibas

## Alcance

El sistema permite gestionar la operacion diaria de una empresa de estibas: autenticacion de usuarios, pedidos, inventario, plan del dia y rutas de despacho. La aplicacion esta preparada para ejecutarse localmente con Vite y desplegarse en Netlify o Vercel.

## Tecnologias

- React con JavaScript.
- Vite como entorno de desarrollo y build.
- Firebase Auth para login y registro.
- Firestore para persistencia y sincronizacion en tiempo real.
- React Router para rutas publicas y privadas.
- CSS organizado por modulos en `src/estilos`.

## Estructura principal

- `src/config`: inicializacion de Firebase.
- `src/contexto`: contexto global de autenticacion.
- `src/rutas`: rutas publicas, privadas y proteccion de sesion.
- `src/plantillas`: layouts publicos y privados.
- `src/paginas`: paginas principales.
- `src/modulos`: funcionalidades por dominio.
- `src/estructuras`: estructuras de datos implementadas a mano.
- `src/servicios`: servicios compartidos de Firebase.
- `src/utilidades`: datos y helpers del sistema.

## Modulos

### Autenticacion

Incluye login, registro y cierre de sesion real con Firebase Auth. Las rutas privadas solo se renderizan cuando existe una sesion activa.

### Pedidos

Permite crear, listar, editar, cambiar estado y eliminar pedidos. Los pedidos pendientes se ordenan con una Cola FIFO usando `queuedAt`.

### Inventario

Permite crear, listar, editar y eliminar productos. Firestore se escucha con `onSnapshot`, por eso la tabla se actualiza en tiempo real. La busqueda usa Arbol Trie para autocomplete por producto, codigo y categoria. Las acciones de inventario se guardan en una Pila para deshacer.

### Plan del dia

Lee pedidos pendientes desde Firestore y usa Heap/Priority Queue para ordenar primero los urgentes, luego los de fecha mas cercana y finalmente los mas antiguos en cola. El siguiente pedido prioritario se puede mover a `en_proceso`.

### Rutas de despacho

Usa un Grafo ponderado con nodos logisticos, clientes y pesos en kilometros. El sistema calcula el camino mas corto desde bodega central hasta el destino seleccionado.

## Estructuras de datos conectadas

- Cola: flujo de pedidos pendientes.
- Pila: deshacer acciones de inventario.
- Heap/Priority Queue: priorizacion del plan del dia.
- Trie: busqueda inteligente de productos.
- Grafo: rutas y optimizacion de transporte.

## Datos principales en Firestore

### Coleccion `orders`

Contiene los pedidos con cliente, producto, cantidad, destino, fecha requerida, prioridad, estado, `queuedAt`, `createdAt`, `updatedAt` y datos del usuario creador.

### Coleccion `inventory`

Contiene los productos con codigo, nombre, categoria, stock, stock minimo, unidad, ubicacion, proveedor, estado automatico, `createdAt`, `updatedAt` y datos del usuario creador.

## Despliegue

Para desplegar en Vercel o Netlify se deben configurar las mismas variables `VITE_FIREBASE_*` en el panel del proveedor. El comando de build es:

```bash
npm run build
```

La carpeta de salida es:

```bash
dist
```
