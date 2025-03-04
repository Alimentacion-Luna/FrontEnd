export interface Proveedor {
  nombre: string;
  telefono: number;
  correo: string;
}

export interface ProveedorConProductos extends Proveedor {
  offset: number;
  productos: Producto[];
}

export interface Pedido {
  fechaPedido: Date;
  precioTotal: number;
  Estado: string;
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

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: string;
}
