import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Para manejos de pedidos http
import { environment } from '../../environments/environment';
import { tap, map, catchError } from 'rxjs/operators'; // tap es un operador de pipe para disparar un efecto secundario
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';


import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from 'src/models/usuario.model';

declare const google: any; // Utilizar globalmente  para usar el objeto global que me da google

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;

  constructor(  private http: HttpClient,
                private router: Router,
                private ngZone: NgZone) {

        this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || ''; // De no existir el token, retornar string vacio
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  googleInit() {

      google.accounts.id.initialize({
        client_id: "537976435600-j9077vafl2eugc7smnskkdtev3aujh9e.apps.googleusercontent.com", // No es ideal que el ID publico se coloque de esta manera (pero para fin del curso está bien)
        callback: (response:any) => this.handleCredentialResponse(response), // Tomamos el primer valor y se lo enviamos como response (para evitar el cambio del "this")
      });

  }


  handleCredentialResponse( response: any) {

    // console.log("Encoded JWT ID token: " + response.credential);
    this.loginGoogle( response.credential )
        .subscribe( res => {
          // Navegar el dashboard
          this.ngZone.run( () => {
            this.router.navigateByUrl('/');
          });
        })

  }


  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token // Utiliza el getter
      }
    }).pipe(
      map( (res: any) => {
        // console.log(res);

        // Descontruyo los atributos necesarios de la respuesta para crear un nuevo objeto de tipo usuario con los elementos requeridos para trabajar con el mismo
        const { email, google, nombre, role, img = '', uid } = res.usuario;

        this.usuario = new Usuario(nombre,email, '', img, google, role, uid); // Password no se debe traer
        localStorage.setItem('token', res.token); // Graba el nuevo token renovado


        return true;  // De pasar la respuesta, directamente devolverá "true" porque pudo renovar el token
      }),
      catchError( // Manejador de RXJS para los errores que puedan ocurrir
        error => {
          console.log(error);
          return of(false); // of transforma en observable el elemento enviado y no romper el ciclo armado de devolver un observable<boolean>
        }
      )
    );
  }

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

  actualizarPerfil( data: {email: string, nombre: string, role: string}) { // También se puede hacer una interfaz o así de forma explicita

    data = {
      ...data,
      role: this.usuario.role || 'USER_ROLE' // Le asigna el mismo role del usuario o sino da el por defecto (que estableci en el backend)
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
      'x-token': this.token
      }
    })

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


  loginGoogle( token: string ) {

    return this.http.post(`${ base_url}/login/google`, {token})
            .pipe(
              tap( (res: any) => {
                // console.log(res);
                // console.log(res.token);
                localStorage.setItem('token', res.token)
              })
            );

  }


  logout() {

    localStorage.removeItem('token');
    // De esta manera quita cualquier visualización de que el usuario logueado con google este visible al desloguearse
    google.accounts.id.revoke( 'momfusutn@gmail.com', () => {
      this.router.navigateByUrl('/login');
    })

  }

}
