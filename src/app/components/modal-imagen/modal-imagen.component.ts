import { Component, ElementRef, ViewChild } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from '../../services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {

  public imagenSubir!: File;
  public imgTemp!: string | ArrayBuffer | null;

  @ViewChild('inputFile') inputFile!: ElementRef<any>; // Usado para que no salga el nombre de la imagen subida anteriormente en el modal al volverse abrir luego de cancelar

  constructor(
      public modalImagenService: ModalImagenService,
      public fileUploadService: FileUploadService
    ) {

  }

  clearForm() {
    this.inputFile.nativeElement.value = "";
  }

  cerrarModal() {
    this.imgTemp = null;
    this.clearForm();
    this.modalImagenService.cerrarModal();
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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto( this.imagenSubir, tipo, id)
    .then( img  => {
        Swal.fire('Guardado', 'Imagen de usuario actualizado', 'success');

        this.modalImagenService.nuevaImagen.emit( img )

        this.cerrarModal();
      }
    ).catch( err => {
      console.log(err);
      Swal.fire('Error', err.error.msg, 'error');
    });

  }


}
