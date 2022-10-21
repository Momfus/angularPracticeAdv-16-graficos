import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [ localStorage.getItem('remember') || false] // Saber si se quiere que el usuario se recuerde
  });


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) { }

  login() {

    // console.log( this.loginForm.value );

    this.usuarioService.loginUsuario( this.loginForm.value )
      .subscribe( res => {

        // console.log(res);

        if( this.loginForm.get('remember')?.value ) {
          localStorage.setItem('email', this.loginForm.get('email')?.value)
          localStorage.setItem('remember', this.loginForm.get('remember')?.value)

        } else {
          localStorage.removeItem('email');
        }

      }, (err => {


        // En caso de tener varios errores de validación, seleccionar el primero
        let errorObject = err.error.errors;
        if( errorObject != undefined && Object.keys(err.error.errors).length > 0) {

          console.log(err);
          let firtErrorElement: any = Object.values(err.error.errors)[0]
          Swal.fire('Error',  firtErrorElement.msg, 'error');

        } else {

          // Error personalizado recibido
          Swal.fire('Error', err.error.msg, 'error');

        }



      }))

  }

}
