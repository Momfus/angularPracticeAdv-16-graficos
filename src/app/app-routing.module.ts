import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutingModule } from './pages/pages.routing';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { NotpagefoundComponent } from './notpagefound/notpagefound.component';

// Rutas de la aplicación
const routes: Routes =  [

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: '**', component: NotpagefoundComponent } // Redireccionar en cualquier otro caso que no coincida con los anteriores

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes ), // para rutas principales definidas anteriormente
    PagesRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
