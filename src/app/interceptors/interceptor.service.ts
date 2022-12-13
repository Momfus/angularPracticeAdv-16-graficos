import { HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor() { }

  get token(): string {
    return localStorage.getItem('token') || ''; // De no existir el token, retornar string vacio
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    console.log('interceptor aca >>>>');
    const reqClone = req.clone({
      headers
    });

    return next.handle(reqClone);

  }

}

