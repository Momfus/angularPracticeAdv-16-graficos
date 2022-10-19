import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Para manejos de pedidos http
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient) { }

  crearUsuario( formData: RegisterForm) {

    return this.http.post(`${base_url}/usuarios`, formData); // Al ser un observable, la única forma que se dispare es que se debe subscribir donde se use (por eso el return)

  }

}
