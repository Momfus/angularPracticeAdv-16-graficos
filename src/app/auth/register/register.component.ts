import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css']
})
export class RegisterComponent {

  public registerForm = this.fb.group({
    nombre: ['Momfus', Validators.required],
    email: ['test100@gmail.com', Validators.required],
    password1: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [ false, Validators.required]

  });

  constructor( private fb: FormBuilder) { }

  crearUsuario() {

    console.log( this.registerForm.value );

  }

}
