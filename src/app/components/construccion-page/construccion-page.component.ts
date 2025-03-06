import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FuncsService } from '../../services/funcs.service';
import { account } from '../../../appwrite';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-construccion-page',
  imports: [],
  templateUrl: './construccion-page.component.html',
  styleUrl: './construccion-page.component.css'
})
export class ConstruccionPageComponent {
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
      await this.router.navigate(['/login']);
    }
}
