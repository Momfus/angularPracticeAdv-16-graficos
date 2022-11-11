import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor( private usuariosService: UsuarioService ) { }

  ngOnInit(): void {

    this.cargarUsuarios();

  }

  cargarUsuarios() {

    this.cargando = true;

    this.usuariosService.cargarUsuarios( this.desde )
    .subscribe( ( {total, usuarios}) => { // Información regresada que destructuro para manejar directamente

      this.totalUsuarios = total;
      this.usuarios = usuarios;
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

}
