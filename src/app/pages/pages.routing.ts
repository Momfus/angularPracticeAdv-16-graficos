// Manejo de rutas que están internas al directorio 'pages'.

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


const routes: Routes = [

  {
    path: 'dashboard', // Se hace relativo a dashboard las siguientes rutas
    component: PagesComponent,
    canActivate: [AuthGuard], // Manejar quien puede entrar a estas páginas
    children: [ // Se definen rutas hijas para separar las zonas de registro/login con el resto para un diseño

      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } }, // Con 'data' se envian atributos
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes de Cuenta' } },
      { path: 'buscar/:termino', component: BusquedaComponent, data: { title: 'Búsquedas' } },
      { path: 'grafica1', component: Grafica1Component, data: { title: 'Gráfica #1' } },
      { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil de usuario' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'ProgressBar' } },
      { path: 'promesas', component: PromesasComponent,data: { title: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },

      // Mantenimientos
      { path: 'hospitales', component: HospitalesComponent, data: { title: 'Mantenimiento de Hospitales' } },
      { path: 'medicos', component: MedicosComponent, data: { title: 'Mantenimiento de Médicos' } },
      { path: 'medico/:id', component: MedicoComponent, data: { title: 'Mantenimiento de Médico' } },
      { path: 'usuarios', component: UsuariosComponent, data: { title: 'Mantenimiento de Usuarios' } },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)], // forChild para rutas hijas (en este caso desde los elementos del directorio 'pages')
  exports: [RouterModule]
})
export class PagesRoutingModule {}
