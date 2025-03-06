export interface Proveedor {
  idProveedor: number;
  nombre: string;
  telefono: number;
  correo: string;
}

export interface ProveedorConProductos extends Proveedor {
  offset: number;
  productos: Producto[];
}

export interface Pedido {
  idPedido: number;
  fechaPedido: Date;
  precioTotal: number;
  estado: string;
  proveedor: Proveedor;
  detalles: DetallesPedido[];
}

export interface DetallesPedido {
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  precioCantidad: number;
  descuento: number;
  impuesto: number;
}

export interface Tipo {
  id: number;
  nombre: string;
}

export interface Producto {
  idProducto: number;
  nombreProd: string;
  descripcion: string;
  precio: number;
  tipo: Tipo;
  impuesto: number;
  descuento: number;
}
