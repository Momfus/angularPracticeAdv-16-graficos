import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutinModule } from './auth/auth.routing';

import { NotpagefoundComponent } from './notpagefound/notpagefound.component';

// Rutas de la aplicación
const routes: Routes =  [

  // << Ubicación de rutas >>
  // path: '/dashboard' PageRouting
  // path: '/auth' AuthRouting

  { path: '**', component: NotpagefoundComponent } // Redireccionar en cualquier otro caso que no coincida con los anteriores

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes ), // para rutas principales definidas anteriormente
    PagesRoutingModule,
    AuthRoutinModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
