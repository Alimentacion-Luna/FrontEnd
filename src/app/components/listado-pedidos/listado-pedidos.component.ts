import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FuncsService} from '../../services/funcs.service';
import {account} from '../../../appwrite';
import {AsyncPipe, CurrencyPipe, NgFor} from '@angular/common';
import {DalService} from '../../services/dal.service';
import {Observable, of} from 'rxjs';
import {Pedido} from '../../ent/dto';


@Component({
  selector: 'app-listado-pedidos',
  imports: [NgFor, RouterLink, CurrencyPipe, AsyncPipe],
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.css']
})
export class ListadoPedidosComponent {
  loggedInUser: any = null;
  //pedidos: Observable<Pedido[]>;
  pedidos: Observable<Pedido[]> = of([]);

  constructor(private router: Router, private funcs: FuncsService, private dal: DalService) {
    // verificar que sea un usuario registrado
    funcs.getLoggedInUser().then(res => {
      if (res == null) {
        this.router.navigate(['/login']);
      } else {
        this.loggedInUser = res;
        this.pedidos = dal.getPedidos();
      }
    });
  }

  async logout(): Promise<void> {
    await account.deleteSession('current');
    this.router.navigate(['/login']);
  }
}
