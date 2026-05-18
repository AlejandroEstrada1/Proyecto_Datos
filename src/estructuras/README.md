# Estructuras de datos

Este directorio contiene las implementaciones en JavaScript usadas por funcionalidades reales del sistema.

- `Cola.js`: flujo FIFO de pedidos pendientes. El modulo de pedidos toma el primer pedido de la cola y lo mueve a `en_proceso`.
- `Pila.js`: historial LIFO de acciones de inventario. Permite deshacer crear, actualizar o eliminar productos.
- `HeapPrioridad.js`: cola de prioridad generica. El plan del dia ordena pedidos por urgencia, fecha requerida y llegada a la cola.
- `ArbolTrie.js`: indice de busqueda para autocomplete de productos, codigos y categorias.
- `Grafo.js`: grafo ponderado. Rutas de despacho calcula el camino mas corto desde bodega hasta el cliente.
