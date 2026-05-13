# Documento Final - Sistema de Gestion de Estibas

## Integrantes

- Alejandro Estrada: primera mitad del sistema.
- Kristian David Castrillon Paz: Plan del dia y Rutas de Despacho.

## Alcance del sistema

El sistema permite gestionar pedidos, inventario, planificacion diaria de despacho y rutas de entrega mediante estructuras de datos vistas en clase.

## Tecnologias utilizadas

- React
- Vite
- Firebase Authentication
- Firebase Firestore
- React Router DOM
- CSS modular por secciones

## Estructuras de datos

### Cola

Utilizada para manejar pedidos pendientes bajo el principio FIFO.

### Lista Enlazada

Utilizada para representar el plan del dia y recorrer pedidos asignados al despacho.

### Arbol Trie

Utilizado para busqueda por prefijo en inventario.

### Heap de Prioridad

Utilizado para ordenar pedidos segun prioridad ALTA, MEDIA y BAJA.

### Grafo

Utilizado para representar rutas de despacho entre la bodega y los clientes.

## Modulos desarrollados por Kristian

- Plan del dia.
- Rutas de Despacho.
- Heap de prioridad.
- Lista enlazada.
- Grafo.
