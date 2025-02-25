import {inject, Injectable} from '@angular/core';
import {API_URL} from '../../appwrite';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pedido, Proveedor} from '../ent/entidades';

@Injectable({
  providedIn: 'root'
})
export class DalService {

  constructor() {
  }

  http = inject(HttpClient)

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(API_URL + "/proveedores")
  }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(API_URL + "/pedidos")
  }
}
