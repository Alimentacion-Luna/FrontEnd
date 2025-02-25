export interface Proveedor {
  idProveedor: number;
  nombre: string;
  telefono: bigint;
  correo: string;
}

export interface Producto {
  idProducto: number;
  idTipoProducto: number;
  nombre: string;
  impuesto: number;
}

export interface Pedido {
  idPedido: number;
  idProveedor: number;
  fechaPedido: Date;
  precioTotal: number;
  estado: string;
}

export interface DetallesPedido {
  idPedido: number;
  idProducto: number;
  cantidad: number;
  precioUnitario: number;
  precioCantidad: number;
  descuento: number;
  impuesto: number;
}

export interface ProveedorProducto extends Producto {
  idProveedor: number;
  nombreProveedor: string;
}

export interface PedidoConNProveedor extends Pedido {
  nombreProveedor: string;
}

export interface DetallesCompletos extends DetallesPedido {
  nombreProducto: string;
  nombreProveedor: string;
}
