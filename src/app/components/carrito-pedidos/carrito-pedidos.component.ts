import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FuncsService} from '../../services/funcs.service';
import {account, WEB_URL} from '../../../appwrite';
import {AsyncPipe, CurrencyPipe, NgFor} from '@angular/common';
import {DetallesPedido, Pedido, Producto, Proveedor} from '../../ent/dto';
import {DalService} from '../../services/dal.service';
import {map, Observable, of} from 'rxjs';

// Interfaces para mostrar los datos
interface ProductoCarrito extends Producto {
  cantidad: number;
  precio_total: number;
}

@Component({
  selector: 'app-carrito-pedidos',
  imports: [NgFor, CurrencyPipe, AsyncPipe],
  templateUrl: './carrito-pedidos.component.html',
  styleUrl: './carrito-pedidos.component.css'
})
export class CarritoPedidosComponent {
  loggedInUser: any = null;
  proveedores: Observable<Proveedor[]> = of([]);
  productosProveedor: Observable<Producto[]> = of([]);
  carrito: ProductoCarrito[] = [];
  proveedorSeleccionado?: Proveedor;

  nuevoPedido?: Pedido

  protected readonly WEB_URL = WEB_URL;
  ocultarProveedor: boolean = true;
  ocultarSelector: boolean = false;

  constructor(private router: Router, private funcs: FuncsService, private dal: DalService) {
    this.funcs.getLoggedInUser().then(res => {
      if (res == null) {
        this.router.navigate(['/login']);
      } else {
        this.loggedInUser = res;
        this.proveedores = this.dal.getProveedores();
      }
    });
  }

  async logout(): Promise<void> {
    await account.deleteSession('current');
    await this.router.navigate(['/login']);
  }

  agregarAlCarrito(producto: Producto): void {
    // Verificar si el producto ya está en el carrito
    const productoExistente = this.carrito.find(p => p.idProducto === producto.idProducto);
    if (productoExistente) {
      // Si existe, incrementar la cantidad y recalcular
      productoExistente.cantidad++;
      this.actualizarPrecioTotal(productoExistente);
    } else {
      // Si no existe, añadirlo al carrito
      const productoCarrito: ProductoCarrito = {
        ...producto,
        cantidad: 1,
        precio_total: 0
      };
      this.carrito.push(productoCarrito);
      this.actualizarPrecioTotal(productoCarrito)
    }
  }

  // Función para actualizar la cantidad de un producto en el carrito seleccionando el input
  actualizarCantidad(producto: ProductoCarrito, event: Event): void {
    const target = event.target as HTMLInputElement;
    producto.cantidad = parseInt(target.value, 10) || 1;
    this.actualizarPrecioTotal(producto);
  }

  // Función para actualizar el precio total de un producto en el carrito cuando se incrementa o decrementa la cantidad
  actualizarPrecioTotal(producto: ProductoCarrito): void {
    const precioSinImpuesto = producto.precio * producto.cantidad;
    const montoImpuesto = precioSinImpuesto * (producto.impuesto / 100);
    producto.precio_total = precioSinImpuesto + montoImpuesto;
  }

  // Función para manejar el cambio de proveedor del select de proveedores
  onProveedorChange(event: Event): void {
    const target = event.target as HTMLSelectElement;

    // Buscar nombre en el array de proveedores por su ID
    this.proveedores.pipe(
      map(proveedores =>
        proveedores.find(p =>
          p.idProveedor === parseInt(target.value, 10)
        )
      )
    ).subscribe(p => {
        this.proveedorSeleccionado = p;
        this.productosProveedor = this.dal.getProductosProveedor(p!.idProveedor);
        this.ocultarProveedor = false;
        this.ocultarSelector = true;
      }
    );
  }

  cambiarProveedor(): void {
    this.ocultarProveedor = true;
    this.ocultarSelector = false;
    this.carrito = [];
    this.productosProveedor = of([]);
  }

  // Función para eliminar un producto del carrito cuando se pulse el botón "Eliminar"
  eliminarDelCarrito(producto: ProductoCarrito): void {
    const index = this.carrito.indexOf(producto);
    if (index !== -1) {
      this.carrito.splice(index, 1);
    }
  }

  tramitarPedido() {
    if (this.proveedorSeleccionado == null) return;

    let precioTotal = 0;

    this.nuevoPedido = {
      idPedido: -1,
      fechaPedido: new Date(),
      precioTotal: 0,
      estado: 'Pendiente', // Por ejemplo
      proveedor: this.proveedorSeleccionado,
      detalles: []
    }

    for (const producto of this.carrito) {
      const detalle: DetallesPedido = {
        nombreProducto: producto.nombreProd,
        cantidad: producto.cantidad,
        precioUnitario: producto.precio,
        precioCantidad: producto.precio + (producto.precio * (producto.impuesto / 100)),
        impuesto: producto.impuesto
      };
      precioTotal += detalle.precioCantidad;
      this.nuevoPedido.detalles.push(detalle);
    }

    this.nuevoPedido.precioTotal = precioTotal;

    this.dal.addPedido(this.nuevoPedido).subscribe(_ => {
      console.log('Se ha agregado el pedido correctamente');
      this.router.navigate(['/listado-pedidos']);
    })
  }
}
