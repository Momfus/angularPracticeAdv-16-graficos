import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario!: Usuario;

  constructor(
      private usuarioService: UsuarioService,
      private router: Router,
    ) {

      this.usuario = usuarioService.usuario; // Tengo accesso a sus propiedades, funciones (como los getters)

  }

  logout() {
    this.usuarioService.logout();
  }

  buscar( termino: string ) {

    if( termino.trim().length === 0 ) {
      this.router.navigateByUrl('/dashboard');
      return;
    }

    this.router.navigateByUrl(`/dashboard/buscar/${ termino }`);
  }

}
