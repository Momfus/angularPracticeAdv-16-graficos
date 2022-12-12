// Manejo de rutas que están internas al directorio 'pages'.

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';


const routes: Routes = [

  {
    path: 'dashboard', // Se hace relativo a dashboard las siguientes rutas
    component: PagesComponent,
    canActivate: [AuthGuard], // Manejar quien puede entrar a estas páginas
    canLoad: [ AuthGuard], // Se necesita verificar si la ruta se puede cargar antes del llamado de los child-routes
    loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule), // Se hace una función en la cual se importa el modulo de manera lazy load
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)], // forChild para rutas hijas (en este caso desde los elementos del directorio 'pages')
  exports: [RouterModule]
})
export class PagesRoutingModule {}
