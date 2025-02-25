import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FuncsService } from '../../services/funcs.service';
import { account } from '../../../appwrite';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-listado-pedidos',
  imports: [NgFor],
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.css']
})
export class ListadoPedidosComponent {
  loggedInUser: any = null;
  pedidos: any[] = [];

  constructor(private router: Router, private funcs: FuncsService) {
    // verificar que sea un usuario registrado
    funcs.getLoggedInUser().then(res => {
      if (res == null) {
        this.router.navigate(['/login']);
      } else {
        this.loggedInUser = res;
        this.cargarPedidos();
      }
    });
  }

  async logout(): Promise<void> {
    await account.deleteSession('current');
    this.router.navigate(['/login']);
  }

  // simulador de pedidos, cambiar por la de la api cuando este
  cargarPedidos() {
    this.pedidos = [
      { id_pedido: 1, id_proveedor: 101, fecha_pedido: '2022-01-01', precio_total: 100.00, estado: 'Entregado' },
      { id_pedido: 2, id_proveedor: 102, fecha_pedido: '2022-01-05', precio_total: 200.00, estado: 'En proceso' },
      { id_pedido: 3, id_proveedor: 103, fecha_pedido: '2022-01-10', precio_total: 300.00, estado: 'Pendiente' },
      { id_pedido: 4, id_proveedor: 101, fecha_pedido: '2022-01-15', precio_total: 400.00, estado: 'Entregado' },
      { id_pedido: 5, id_proveedor: 102, fecha_pedido: '2022-01-20', precio_total: 500.00, estado: 'En proceso' },
      { id_pedido: 6, id_proveedor: 103, fecha_pedido: '2022-01-25', precio_total: 600.00, estado: 'Pendiente' },
      { id_pedido: 7, id_proveedor: 101, fecha_pedido: '2022-02-01', precio_total: 700.00, estado: 'Entregado' },
      { id_pedido: 8, id_proveedor: 102, fecha_pedido: '2022-02-05', precio_total: 800.00, estado: 'En proceso' },
      { id_pedido: 9, id_proveedor: 103, fecha_pedido: '2022-02-10', precio_total: 900.00, estado: 'Pendiente' },
      { id_pedido: 10, id_proveedor: 101, fecha_pedido: '2022-02-15', precio_total: 1000.00, estado: 'Entregado' },
      { id_pedido: 11, id_proveedor: 102, fecha_pedido: '2022-02-20', precio_total: 1100.00, estado: 'En proceso' },
      { id_pedido: 12, id_proveedor: 103, fecha_pedido: '2022-02-25', precio_total: 1200.00, estado: 'Pendiente' },
      { id_pedido: 13, id_proveedor: 101, fecha_pedido: '2022-03-01', precio_total: 1300.00, estado: 'Entregado' },
      { id_pedido: 14, id_proveedor: 102, fecha_pedido: '2022-03-05', precio_total: 1400.00, estado: 'En proceso' },
      { id_pedido: 15, id_proveedor: 103, fecha_pedido: '2022-03-10', precio_total: 1500.00, estado: 'Pendiente' }
    ];
  }
}
