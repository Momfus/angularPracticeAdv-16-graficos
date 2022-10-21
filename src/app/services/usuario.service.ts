import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Para manejos de pedidos http
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators'; // tap es un operador de pipe para disparar un efecto secundario


import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient) { }

  crearUsuario( formData: RegisterForm) {

    return this.http.post(`${base_url}/usuarios`, formData) // Al ser un observable, la única forma que se dispare es que se debe subscribir donde se use (por eso el return)
                .pipe(
                  tap( (res: any) => {
                    // Efecto secundario al suscribirse
                    // Guardar el token en el localstorage
                    localStorage.setItem('token', res.token)

                  })
                );
  }

  loginUsuario( formData: LoginForm) {

    return this.http.post(`${base_url}/login`, formData) // Al ser un observable, la única forma que se dispare es que se debe subscribir donde se use (por eso el return)
                .pipe(
                  tap( (res: any) => {
                    // Efecto secundario al suscribirse
                    // Guardar el token en el localstorage
                    localStorage.setItem('token', res.token)

                  })
                );
  }

}
