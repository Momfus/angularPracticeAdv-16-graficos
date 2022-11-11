import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public sinUsuario: boolean = false;

  constructor(
      private usuariosService: UsuarioService,
      private busquedaService: BusquedasService
      ) { }

  ngOnInit(): void {

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

}
