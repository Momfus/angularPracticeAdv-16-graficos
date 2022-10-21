import { Component, OnInit } from '@angular/core';
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
    email: ['15@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    remember: [false] // Saber si se quiere que el usuario se recuerde
  });


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  login() {

    // console.log( this.loginForm.value );

    this.usuarioService.loginUsuario( this.loginForm.value )
      .subscribe( res => {
        console.log(res);
      }, (error => {
        Swal.fire('Error', error.error.msg, 'error');
      }))

  }

}
