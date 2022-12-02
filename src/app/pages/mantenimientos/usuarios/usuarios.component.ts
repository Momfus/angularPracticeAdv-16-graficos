import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Usuario } from '../../../../models/usuario.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public sinUsuario: boolean = false;
  public uidActual: string = this.usuariosService.uid; // Para usar del lado html

  public imgSubs!: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;


  constructor(
      private usuariosService: UsuarioService,
      private busquedaService: BusquedasService,
      private modalImagenService: ModalImagenService
      ) { }

  ngOnInit(): void {

    this.cargarUsuarios();

    // Cambiar la lista actual si recibe un cambio
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(50) // Se le agrega un leve delay porque la carga es muy rápida y la recarga se termina antes (al ser pocos datos)
      )
      .subscribe( img => {
        this.cargarUsuarios();
      }
    );

  }

  ngOnDestroy(): void {
      this.cargarUsuarios();
  }

  cargarUsuarios() {

    this.cargando = true;

    this.usuariosService.cargarUsuarios( this.desde )
    .subscribe( ( {total, usuarios}) => { // Información regresada que destructuro para manejar directamente

      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios; // no debe apuntar a "this.usuarios" sino al cambiar uno afectaria al otro
      this.cargando = false;

    });

  }

  cambiarPagina( valor: number ) {

    this.desde += valor;

    if( this.desde < 0 ) {
      this.desde = 0;
    } else if( this.desde >= this.totalUsuarios ) { // Para no superar el total de usuarios.
      this.desde -= valor;
    }

    this.cargarUsuarios();

  }

  buscar(termino: string) {

    if( termino.length === 0 ) {
      this.usuarios = this.usuariosTemp; // De esta manera se queda con el total de usuarios (sin búsqueda)
      return;
    }

    this.busquedaService.buscar('usuarios', termino)
      .subscribe( res => {
        this.usuarios = res;

        this.sinUsuario = res.length === 0 ? true : false;

      });


  }

  eliminarUsuario( usuario: Usuario ){

    // No dejar editar si el usuario a borrar es igual al usuario logueado (se puede también hacer por html)
    if( usuario.uid === this.uidActual ) {

      Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
      return;

    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuariosService.eliminarUsuario( usuario )
            .subscribe( res => {

                // Para volver a la página anterior si el total de usuarios en la actual ya no existe y no es la primera página
                if( this.desde === (this.totalUsuarios - 1 ) && this.desde != 0 ){
                  this.desde -= 5;
                }

                this.cargarUsuarios(); // Recargar lista y paginación

                Swal.fire(

                  'Usuario borrado',
                  `${usuario.nombre} fue eliminado correctamente`,
                  'success'

                )

            });


      }
    })

  }

  cambiarRole( usuario: Usuario ) {

    this.usuariosService.guardarUsuario( usuario )
      .subscribe( res => {
        console.log(res);
      });

  }

  abrirModal(usuario: Usuario) {

    console.log(usuario);
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);

  }

}
