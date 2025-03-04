import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import { ListadoPedidosComponent } from './components/listado-pedidos/listado-pedidos.component';
import { CarritoPedidosComponent } from './components/carrito-pedidos/carrito-pedidos.component';
import { ConstruccionPageComponent } from './components/construccion-page/construccion-page.component';
import { DetallesPedidoComponent } from './components/detalles-pedido/detalles-pedido.component';


export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'detalles-pedido', component: DetallesPedidoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'listado-pedidos', component: ListadoPedidosComponent},
  {path: 'carrito-pedidos', component: CarritoPedidosComponent},
  {path: 'construccion', component: ConstruccionPageComponent},
  {path: 'detalles-pedido/:id', component: DetallesPedidoComponent},
];
