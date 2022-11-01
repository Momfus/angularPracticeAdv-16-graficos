import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public usuario!: Usuario;
  public perfilForm!: FormGroup;
  public imagenSubir!: File;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group ({

      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],

    });
  }

  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
        /* No necesito un res, traigo directamente del formulario y el usuario que es traido del servicio, es por referencia
        (los objetos en javascript); por lo que se modifica así en todo lugar que se use*/
        .subscribe( ()  => {
          const {nombre, email } = this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;
        });
  }

  cambiarImagen( file: File) {

    this.imagenSubir = file;

  }

  subirImagen() {

    this.fileUploadService.actualizarFoto(
      this.imagenSubir,
      'usuarios',
      this.usuario.uid || '' // El vacio dará error en caso que no tenga, que no debería.
    ).then( img  => console.log(img) );

  }

}
