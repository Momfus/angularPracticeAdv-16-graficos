import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptors/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NotpagefoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  providers:  [

    {
      // Por cada interceptor, se puede si son varios meter en un modulo
      provide: HTTP_INTERCEPTORS, // Se define que es un interceptor el provider
      useClass: InterceptorService, // el interceptor creado
      multi: true // para estar pendiente de todas las intercepciones http
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
