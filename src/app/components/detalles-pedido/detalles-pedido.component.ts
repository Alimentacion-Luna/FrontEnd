import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncsService } from '../../services/funcs.service';
import { CurrencyPipe, NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-detalles-pedido',
  imports: [NgFor, CurrencyPipe, NgClass],
  templateUrl: './detalles-pedido.component.html',
  styleUrls: ['./detalles-pedido.component.css']
})
export class DetallesPedidoComponent implements OnInit {
  pedido: any = {};
  productos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const pedidoId = this.route.snapshot.paramMap.get('id');
    if (pedidoId) {
      this.cargarDetallesPedido(pedidoId);
    } else {
      this.router.navigate(['/listado-pedidos']);
    }
  }

  // Cambiar por la de la api
  cargarDetallesPedido(pedidoId: string): void {
    this.pedido = {
      id_pedido: pedidoId,
      proveedor: {
        nombre: 'Fernando SL',
        correo: 'fernando@gmail.com',
        telefono: '+34 123 456 789'
      },
      fecha_pedido: '2025-02-27',
      estado: 'ENTREGADO',
      total: 900.00
    };

    this.productos = [
      { id_pedido: pedidoId, id_producto: 1, nombre: 'Leche', cantidad: 10, precio_unitario: 1.00, precio_total: 10.00, descuento: 0.1, impuesto: 0.2 },
      { id_pedido: pedidoId, id_producto: 2, nombre: 'Pan', cantidad: 5, precio_unitario: 0.5, precio_total: 2.50, descuento: 0.05, impuesto: 0.1 },
      { id_pedido: pedidoId, id_producto: 3, nombre: 'Cereal', cantidad: 3, precio_unitario: 2.00, precio_total: 6.00, descuento: 0.15, impuesto: 0.2 },
      { id_pedido: pedidoId, id_producto: 4, nombre: 'Jugo', cantidad: 2, precio_unitario: 1.50, precio_total: 3.00, descuento: 0.05, impuesto: 0.1 },
      { id_pedido: pedidoId, id_producto: 5, nombre: 'Galletas', cantidad: 8, precio_unitario: 0.75, precio_total: 6.00, descuento: 0.1, impuesto: 0.2 },
      { id_pedido: pedidoId, id_producto: 6, nombre: 'Azúcar', cantidad: 4, precio_unitario: 0.50, precio_total: 2.00, descuento: 0.05, impuesto: 0.1 },
      { id_pedido: pedidoId, id_producto: 7, nombre: 'Mantequilla', cantidad: 2, precio_unitario: 1.50, precio_total: 3.00, descuento: 0.1, impuesto: 0.2 },
      { id_pedido: pedidoId, id_producto: 8, nombre: 'Café', cantidad: 6, precio_unitario: 2.00, precio_total: 12.00, descuento: 0.15, impuesto: 0.2 },
      { id_pedido: pedidoId, id_producto: 9, nombre: 'Té', cantidad: 3, precio_unitario: 1.50, precio_total: 4.50, descuento: 0.05, impuesto: 0.1 },
      { id_pedido: pedidoId, id_producto: 10, nombre: 'Chocolate', cantidad: 1, precio_unitario: 3.00, precio_total: 3.00, descuento: 0.1, impuesto: 0.2 }
    ];

  }}
