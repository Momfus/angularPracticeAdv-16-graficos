import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password1: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [ false, Validators.required]

  },{
    // Mis validadores personalizados
    validators: this.passwordsIguales('password1', 'password2')
  });

  constructor( private fb: FormBuilder) { }

  crearUsuario() {

    this.formSubmitted = true;
    console.log( this.registerForm ); // Para errores debo fijarme en controls -> el campo que quiero ver -> errors

    if( this.registerForm.valid ) {
      console.log('posteando formulario');
    } else {
      console.log('Formulario no es correcto...');
    }

  }

  campoNoValido( campo: string): boolean {

    if( this.registerForm.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  contraseniasNoValidas() {

    const pass1 = this.registerForm.get('password1')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if( (pass1 !== pass2) && this.formSubmitted){
      return true;
    } else {
      return false;
    }

  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {

    return( formGroup: FormGroup) => { // Obtengo lo nombres de los formularios y devuelve la condición como objeto

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if( pass1Control?.value === pass2Control?.value) {

        pass2Control?.setErrors(null)

      } else {
        pass2Control?.setErrors({ noEsIgual: true })
      }

    }

  }

}
