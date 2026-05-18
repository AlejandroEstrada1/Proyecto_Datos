export const RUTA_ORIGEN_ID = "bodega-central";

export const nodosRutaDespacho = [
  {
    id: "bodega-central",
    nombre: "Bodega central",
    tipo: "origen",
    x: 12,
    y: 48,
  },
  {
    id: "zona-carga",
    nombre: "Zona de carga",
    tipo: "conexion",
    x: 28,
    y: 30,
  },
  {
    id: "corredor-industrial",
    nombre: "Corredor industrial",
    tipo: "conexion",
    x: 46,
    y: 22,
  },
  {
    id: "avenida-principal",
    nombre: "Avenida principal",
    tipo: "conexion",
    x: 42,
    y: 58,
  },
  {
    id: "terminal-sur",
    nombre: "Terminal sur",
    tipo: "conexion",
    x: 63,
    y: 72,
  },
  {
    id: "variante-norte",
    nombre: "Variante norte",
    tipo: "conexion",
    x: 68,
    y: 36,
  },
  {
    id: "cliente-norte",
    nombre: "Cliente Norte",
    tipo: "cliente",
    x: 88,
    y: 26,
  },
  {
    id: "cliente-centro",
    nombre: "Cliente Centro",
    tipo: "cliente",
    x: 72,
    y: 52,
  },
  {
    id: "cliente-sur",
    nombre: "Cliente Sur",
    tipo: "cliente",
    x: 86,
    y: 82,
  },
  {
    id: "cliente-occidente",
    nombre: "Cliente Occidente",
    tipo: "cliente",
    x: 24,
    y: 78,
  },
];

export const aristasRutaDespacho = [
  {
    origen: "bodega-central",
    destino: "zona-carga",
    peso: 6,
    via: "Salida bodega",
  },
  {
    origen: "bodega-central",
    destino: "avenida-principal",
    peso: 10,
    via: "Carrera principal",
  },
  {
    origen: "bodega-central",
    destino: "cliente-occidente",
    peso: 9,
    via: "Anillo occidental",
  },
  {
    origen: "zona-carga",
    destino: "corredor-industrial",
    peso: 7,
    via: "Corredor logistico",
  },
  {
    origen: "zona-carga",
    destino: "avenida-principal",
    peso: 4,
    via: "Interseccion de cargue",
  },
  {
    origen: "corredor-industrial",
    destino: "variante-norte",
    peso: 8,
    via: "Variante industrial",
  },
  {
    origen: "avenida-principal",
    destino: "variante-norte",
    peso: 9,
    via: "Avenida principal norte",
  },
  {
    origen: "avenida-principal",
    destino: "terminal-sur",
    peso: 8,
    via: "Avenida principal sur",
  },
  {
    origen: "avenida-principal",
    destino: "cliente-centro",
    peso: 7,
    via: "Acceso centro",
  },
  {
    origen: "variante-norte",
    destino: "cliente-norte",
    peso: 6,
    via: "Acceso norte",
  },
  {
    origen: "variante-norte",
    destino: "cliente-centro",
    peso: 5,
    via: "Conector centro-norte",
  },
  {
    origen: "terminal-sur",
    destino: "cliente-sur",
    peso: 5,
    via: "Acceso sur",
  },
  {
    origen: "terminal-sur",
    destino: "cliente-centro",
    peso: 6,
    via: "Conexion centro-sur",
  },
  {
    origen: "cliente-occidente",
    destino: "terminal-sur",
    peso: 11,
    via: "Perimetral sur",
  },
];

export const destinosRutaDespacho = nodosRutaDespacho.filter(
  (nodo) => nodo.tipo === "cliente"
);
