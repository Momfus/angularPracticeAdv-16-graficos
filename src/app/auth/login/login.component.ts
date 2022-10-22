import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'

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
    private usuarioService: UsuarioService
  ) { }

  ngAfterViewInit(): void {
      this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        "537976435600-j9077vafl2eugc7smnskkdtev3aujh9e.apps.googleusercontent.com", // No es ideal que el ID publico se coloque de esta manera (pero para fin del curso está bien)
      callback: this.handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" } // customization attributes
    );
  }

  handleCredentialResponse( response: any) {

    console.log("Encoded JWT ID token: " + response.credential);

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

      }, (err => {

        // Error personalizado recibido
        Swal.fire('Error', err.error.msg, 'error');

      }))

  }



  campoNoValido( campo: string): boolean {

    if( this.loginForm.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

}
