import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FuncsService } from './services/funcs.service';
import { account } from '../appwrite';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, NgbCollapseModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AlimentacionLuna';
  public isCollapsed = true;
  private router: Router;
  loggedInUser: any = null;


  

  isLogged(): Boolean {

    let respuesta: Boolean = false

    if (this.router.url !== "/login") {
      respuesta = true;
    }

    return respuesta;
  }

  constructor(private _router: Router, private funcs: FuncsService) {
    this.router = _router

    
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


