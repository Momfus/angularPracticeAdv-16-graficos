import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string | undefined, tipo: 'usuarios'|'medicos'|'hospitales'): string {

    if( !img){ // en caso que no exista el campo por alguna razón

      return `${base_url}/upload/usuarios/no-image`;

    } else if( img.includes('https') ) { // Para imagen de login de google

      return img;

    } else if( img ) { // Resto de los casos

      return `${base_url}/upload/${tipo}/${img}`;

    } else {

      return `${base_url}/upload/usuarios/no-image`;

    }


  }

}
