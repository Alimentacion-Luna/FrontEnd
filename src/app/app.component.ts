import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
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


  isLogged(): Boolean {

    let respuesta: Boolean = false

    if (this.router.url !== "/login") {
      respuesta = true;
    }

    return respuesta;
  }

  constructor(private _router: Router) {
    this.router = _router


  }


}


