import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FuncsService } from '../../services/funcs.service';
import { account } from '../../../appwrite';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-carrito-pedidos',
  imports: [],
  templateUrl: './carrito-pedidos.component.html',
  styleUrl: './carrito-pedidos.component.css'
})
export class CarritoPedidosComponent {
  loggedInUser: any = null;
    pedidos: any[] = [];

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

}
