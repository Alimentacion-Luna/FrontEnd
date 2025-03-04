import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FuncsService } from '../../services/funcs.service';
import { account } from '../../../appwrite';
import { CurrencyPipe, NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-carrito-pedidos',
  imports: [NgFor, CurrencyPipe, NgClass],
  templateUrl: './carrito-pedidos.component.html',
  styleUrl: './carrito-pedidos.component.css'
})
export class CarritoPedidosComponent {
  loggedInUser: any = null;
    productos: any[] = [];

    constructor(private router: Router, private funcs: FuncsService) {
      // verificar que sea un usuario registrado
      funcs.getLoggedInUser().then(res => {
        if (res == null) {
          this.router.navigate(['/login']);
        } else {
          this.loggedInUser = res;
        }
      });
    }

    async logout(): Promise<void> {
      await account.deleteSession('current');
      this.router.navigate(['/login']);
    }





    //listado de pruebas (cambiar por BBDD)
    cargarDetallesProductos(): void {

      this.productos = [
        { id_pedido: 1, id_producto: 1, nombre: 'Leche', cantidad: 10, precio_unitario: 1.00, precio_total: 10.00, descuento: 0.1, impuesto: 0.2 },
        { id_pedido: 2, id_producto: 2, nombre: 'Pan', cantidad: 5, precio_unitario: 0.5, precio_total: 2.50, descuento: 0.05, impuesto: 0.1 },
        { id_pedido: 3, id_producto: 3, nombre: 'Cereal', cantidad: 3, precio_unitario: 2.00, precio_total: 6.00, descuento: 0.15, impuesto: 0.2 },
        { id_pedido: 4, id_producto: 4, nombre: 'Jugo', cantidad: 2, precio_unitario: 1.50, precio_total: 3.00, descuento: 0.05, impuesto: 0.1 },
        { id_pedido: 5, id_producto: 5, nombre: 'Galletas', cantidad: 8, precio_unitario: 0.75, precio_total: 6.00, descuento: 0.1, impuesto: 0.2 },
        { id_pedido: 6, id_producto: 6, nombre: 'Azúcar', cantidad: 4, precio_unitario: 0.50, precio_total: 2.00, descuento: 0.05, impuesto: 0.1 },
        { id_pedido: 7, id_producto: 7, nombre: 'Mantequilla', cantidad: 2, precio_unitario: 1.50, precio_total: 3.00, descuento: 0.1, impuesto: 0.2 },
        { id_pedido: 8, id_producto: 8, nombre: 'Café', cantidad: 6, precio_unitario: 2.00, precio_total: 12.00, descuento: 0.15, impuesto: 0.2 },
        { id_pedido: 9, id_producto: 9, nombre: 'Té', cantidad: 3, precio_unitario: 1.50, precio_total: 4.50, descuento: 0.05, impuesto: 0.1 },
        { id_pedido: 10, id_producto: 10, nombre: 'Chocolate', cantidad: 1, precio_unitario: 3.00, precio_total: 3.00, descuento: 0.1, impuesto: 0.2 }
      ];

    }



}
