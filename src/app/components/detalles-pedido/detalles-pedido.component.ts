import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FuncsService} from '../../services/funcs.service';
import {CurrencyPipe, DatePipe, NgFor} from '@angular/common';
import {DalService} from '../../services/dal.service';
import {Pedido} from '../../ent/dto';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-detalles-pedido',
  imports: [NgFor, CurrencyPipe, DatePipe],
  templateUrl: './detalles-pedido.component.html',
  styleUrls: ['./detalles-pedido.component.css']
})
export class DetallesPedidoComponent implements OnInit {
  loggedInUser: any = null;
  pedido?: Pedido;
  observablePedido?: Observable<Pedido>;

  ngOnInit() {
    const pedidoId = this.route.snapshot.paramMap.get('id');
    if (pedidoId) {
      this.observablePedido = this.dal.getDetallesPedido(pedidoId);
      // convert observable to static value for display
      this.observablePedido.subscribe(data => {
        this.pedido = data;
      });
    } else {
      this.router.navigate(['/listado-pedidos']);
    }
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private funcs: FuncsService,
    private dal: DalService
  ) {
    // verificar que sea un usuario registrado
    this.funcs.getLoggedInUser().then(res => {
      if (res == null) {
        this.router.navigate(['/login']);
      } else {
        this.loggedInUser = res;
      }
    });
  }

  entregarPedido(idPedido: number | undefined) {
   this.dal.updatePedido(idPedido, "recibido").subscribe(
     p => this.pedido = p
   )
  }

  cancelarPedido(idPedido: number | undefined) {
    this.dal.updatePedido(idPedido, "cancelado").subscribe(
      p => this.pedido = p
    )
  }
}
