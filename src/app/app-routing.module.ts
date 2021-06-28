import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NotpagefoundComponent } from './pages/notpagefound/notpagefound.component';
import { PagesComponent } from './pages/pages.component';

// Rutas de la aplicación
const routes: Routes =  [

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

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: '**', component: NotpagefoundComponent } // Redireccionar en cualquier otro caso que no coincida con los anteriores

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes ) // para rutas principales definidas anteriormente
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
