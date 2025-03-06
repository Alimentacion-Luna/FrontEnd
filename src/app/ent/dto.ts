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

export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    categoria: string;
}
