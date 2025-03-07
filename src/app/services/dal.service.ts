import {inject, Injectable} from '@angular/core';
import {API_URL} from '../../appwrite';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

    getProductosProveedor(id: number): Observable<Producto[]> {
        return this.http.get<Producto[]>(API_URL + `/proveedores/${id}/productos`)
    }

    getDetallesPedido(id: number | string): Observable<Pedido> {
        return this.http.get<Pedido>(API_URL + `/pedidos/${id}`)
    }

    updatePedido(idPedido: number | undefined, nuevoEstado: string): Observable<Pedido> {
        if (!idPedido) {
            throw new Error('idPedido is required');
        }

        const url = `${API_URL}/pedidos/${idPedido}`;

        // Set the Content-Type header to text/plain
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        // Send the string directly in the request body
        return this.http.put<Pedido>(url, `"${nuevoEstado}"`, { headers });
    }
}

