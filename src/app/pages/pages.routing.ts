// Manejo de rutas que están internas al directorio 'pages'.

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';


const routes: Routes = [

  {
    path: '',
    component: PagesComponent,
    children: [ // Se definen rutas hijas para separar las zonas de registro/login con el resto para un diseño

      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica1', component: Grafica1Component },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full'  } // Redirección a dashboard cuando no se ingresa a otro sitio

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)], // forChild para rutas hijas (en este caso desde el directorio 'pages')
  exports: [RouterModule]
})
export class PagesRoutingModule {}
