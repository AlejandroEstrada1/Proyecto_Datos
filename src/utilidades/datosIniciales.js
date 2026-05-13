export const pedidosIniciales = [
  {
    id: "pedido-001",
    codigo: "Pedido #001",
    cliente: "Constructora XYZ",
    producto: "100 estibas",
    cantidad: 100,
    prioridad: "ALTA",
    estado: "Listo para despacho",
    destinoId: "cliente-a",
  },
  {
    id: "pedido-002",
    codigo: "Pedido #002",
    cliente: "Almacenes ABC",
    producto: "50 piezas de madera",
    cantidad: 50,
    prioridad: "MEDIA",
    estado: "Requiere verificacion de inventario",
    destinoId: "cliente-b",
  },
  {
    id: "pedido-003",
    codigo: "Pedido #003",
    cliente: "Industrial Cali",
    producto: "200 estibas",
    cantidad: 200,
    prioridad: "BAJA",
    estado: "Programado",
    destinoId: "cliente-c",
  },
];

export const nodosRutaDespacho = [
  {
    id: "bodega",
    nombre: "bodega\norigen",
    x: 18,
    y: 25,
    tipo: "origen",
  },
  {
    id: "cliente-a",
    nombre: "cliente A",
    x: 82,
    y: 25,
    tipo: "cliente",
  },
  {
    id: "cliente-b",
    nombre: "cliente B",
    x: 38,
    y: 76,
    tipo: "cliente",
  },
  {
    id: "cliente-c",
    nombre: "cliente C",
    x: 68,
    y: 66,
    tipo: "cliente",
  },
];

export const conexionesRutaDespacho = [
  {
    origen: "bodega",
    destino: "cliente-a",
    peso: 20,
  },
  {
    origen: "bodega",
    destino: "cliente-b",
    peso: 5,
  },
  {
    origen: "bodega",
    destino: "cliente-c",
    peso: 30,
  },
  {
    origen: "cliente-b",
    destino: "cliente-a",
    peso: 7,
  },
  {
    origen: "cliente-b",
    destino: "cliente-c",
    peso: 2,
  },
  {
    origen: "cliente-c",
    destino: "cliente-a",
    peso: 3,
  },
];