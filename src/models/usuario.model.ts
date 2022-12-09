import { environment } from "src/environments/environment"

const base_url = environment.base_url;

export class Usuario {

  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: 'ADMIN_ROLE' | 'USER_ROLE',
    public uid?: string
  ) {

  }


  get imagenUrl() {

    if( !this.img){ // en caso que no exista el campo por alguna razón

      return `${base_url}/upload/usuarios/no-image`;

    } else if( this.img.includes('https') ) { // Para imagen de login de google

      return this.img;

    } else if( this.img ) { // Resto de los casos

      return `${base_url}/upload/usuarios/${this.img}`;

    } else {

      return `${base_url}/upload/usuarios/no-image`;

    }

  }

}

