import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

declare const google: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn')  googleBtn!: ElementRef;
  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [ localStorage.getItem('remember') || false] // Saber si se quiere que el usuario se recuerde
  });


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone // Esto es usado para que angular espere que haya cambios (llamadas asíncronas). Tambien salva errores por llamadas externas de angular (con otroas librerias, como sucede con route al redirigir)
  ) { }

  ngAfterViewInit(): void {
      this.startApp();
  }

  login() {

    this.formSubmitted = true;

    // console.log( this.loginForm.value );
    if( this.loginForm.invalid ) {
      return;
    }

    this.usuarioService.loginUsuario( this.loginForm.value )
      .subscribe( res => {

        // console.log(res);

        if( this.loginForm.get('remember')?.value ) {
          localStorage.setItem('email', this.loginForm.get('email')?.value)
          localStorage.setItem('remember', this.loginForm.get('remember')?.value)

        } else {
          localStorage.removeItem('email');
        }

        // Navegar el dashboard
        this.router.navigateByUrl('/');

      }, (err => {

        // Error personalizado recibido
        Swal.fire('Error', err.error.msg, 'error');

      }))

  }


  startApp() {

    // En el usuario.service se inicializa lo de google account, cada sitio que utilice este login se debe renderizar el botón
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" } // customization attributes
    );
  }


  campoNoValido( campo: string): boolean {

    if( this.loginForm.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

}


/*
Notas:
    change detection: es el mecanismo (o estrategia) de detección de cambios que utiliza Angular para saber
  cuando debe actualizar un componente o toda la vista en caso de la data haya cambiado.

      --> Estrategias:
            > OnPush: establece la estrategia CheckOne(bajo demanda)
            > Default establece la estrategia en CheckAlways.

*/
