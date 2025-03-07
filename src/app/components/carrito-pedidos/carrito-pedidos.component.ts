import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FuncsService} from '../../services/funcs.service';
import {account, WEB_URL} from '../../../appwrite';
import {AsyncPipe, CurrencyPipe, NgFor} from '@angular/common';
import {Producto, Proveedor} from '../../ent/dto';
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
  proveedorSeleccionado: string = '';

  protected readonly WEB_URL = WEB_URL;
  ocultarProveedor: boolean = true;
  ocultarSelector: boolean = false;

  constructor(private router: Router, private funcs: FuncsService, private dal: DalService) {
    this.funcs.getLoggedInUser().then(res => {
      if (res == null) {
        this.router.navigate(['/login']);
      } else {
        this.loggedInUser = res;
        this.cargarProveedores();
      }
    });
  }

  async logout(): Promise<void> {
    await account.deleteSession('current');
    await this.router.navigate(['/login']);
  }

  cargarProveedores(): void {
    this.proveedores = this.dal.getProveedores();
  }

  cargarProductos(id: number) {
    this.productosProveedor = this.dal.getProductosProveedor(id);
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
        precio_total: producto.precio * (1 - producto.descuento) * (1 + producto.impuesto)
      };
      this.carrito.push(productoCarrito);
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
    producto.precio_total = producto.precio * producto.cantidad * (1 - producto.descuento) * (1 + producto.impuesto);
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
        this.proveedorSeleccionado = p!.nombre;
        this.cargarProductos(p!.idProveedor);
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

}
