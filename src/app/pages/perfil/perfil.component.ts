import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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
  public imgTemp!: string | ArrayBuffer | null;

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

          Swal.fire('Guardado', 'Los cambios fueron guardados', 'success');
        }, (err) => {

          Swal.fire('Error', err.error.msg, 'error');

        });
  }

  cambiarImagen( file: File) {

    this.imagenSubir = file;

    // Si no hay archivo, no continuar (y que la imagen temporal sea null)
    if( !file ) {
      this.imgTemp = null
      return;
    }

    const reader = new FileReader(); // Propio de javascript (no se importa)
    reader.readAsDataURL( file); // Transforma el archivo en un formato visible como imagen

    reader.onload = () => { // Procedimiento cuando se carga

      this.imgTemp = reader.result;
      // console.log(reader.result); // Nunca grabar esto en una base de datos porque es enorme en el formato string
    }

  }

  subirImagen() {

    this.fileUploadService.actualizarFoto(
      this.imagenSubir,
      'usuarios',
      this.usuario.uid || '' // El vacio dará error en caso que no tenga, que no debería.
    ).then(
      img  => {
        Swal.fire('Guardado', 'Imagen de usuario actualizado', 'success');
        this.usuario.img = img // El objeto es por referencia, asi que en todo lugar que se use del usuarioService se cambia.
      }
    ).catch( err => {
      Swal.fire('Error', err.error.msg, 'error');
    });

  }

}
