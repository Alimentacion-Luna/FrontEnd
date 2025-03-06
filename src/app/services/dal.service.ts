import {inject, Injectable} from '@angular/core';
import {API_URL} from '../../appwrite';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pedido, Proveedor} from '../ent/dto';
import {Producto} from '../ent/dto';

@Injectable({
  providedIn: 'root'
})
export class DalService {

  constructor(private http: HttpClient) { // Inyecta HttpClient aquí
  }


  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(API_URL + "/proveedores")
  }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(API_URL + "/pedidos")
  }

  getProductosProveedor(id: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(API_URL + `/proveedores/${id}/productos`)
  }
}
