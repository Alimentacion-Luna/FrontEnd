import {Injectable} from '@angular/core';
import {API_URL} from '../../appwrite';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pedido, Producto, Proveedor} from '../ent/dto';

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

    getProductosProveedor(id: number): Observable<Producto[]> {
        return this.http.get<Producto[]>(API_URL + `/proveedores/${id}/productos`)
    }

    getDetallesPedido(id: number | string): Observable<Pedido> {
        return this.http.get<Pedido>(API_URL + `/pedidos/${id}`)
    }

    updatePedido(idPedido: number | undefined, nuevoEstado: string): Observable<Pedido> {
        return this.http.put<Pedido>(API_URL + `/pedidos/${idPedido}`, `"${nuevoEstado}"`);
    }

    addPedido(nuevoPedido: Pedido): Observable<Pedido> {
        console.log(JSON.stringify(nuevoPedido));
        return this.http.post<Pedido>(API_URL + '/pedidos', nuevoPedido);
    }
}

