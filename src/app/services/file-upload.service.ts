import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  // Nota recordatorio: El constructor siempre debe ser síncrono
  constructor() { }

  async actualizarFoto (
    archivo: File, // File es propio de Javascript
    tipo: 'usuarios' | 'medicos' | 'hospitales', // Si coloc string es muy abierto, de esta manera restrinjo por estos tipos (si son más conviene uno de enumerator)
    id: string // Id del elemento a actualizar
  ) {

    try {

      const url = `${base_url}/upload/${tipo}/${id}`;
      const formData = new FormData() // Propio de javascript para armar el dato que se quiere enviar

      formData.append('imagen',archivo); // Primer argumento la propiedad que se pide en el body y el segundo el valor (en este caso el recibido por el método)

      // Armar petición
      const res = await fetch( url, { // fetch es propio de javascript, permite
        method: 'PUT',
        headers:  {
          'x-token': localStorage.getItem('token') || '' // Si llegara a usarse más veces en este servicio (como en usuario service) podría hacer una función get de los headers directamente.
        },
        body: formData
      });

      const data = await res.json();

      console.log(data);

      return true


    } catch (error) {
      console.log(error);
      return false;
    }

  }

}
