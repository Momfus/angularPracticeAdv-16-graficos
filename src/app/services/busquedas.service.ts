import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { Medico } from 'src/models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(
    private http: HttpClient
  ) { }


  private transformarUsuarios( resultados: any[] ): Usuario[] { // Permite ir armando el objeto usuario y así mostrar correctamente su información (como las imagenes)

    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
    );

  }

  private transformarHospitales( resultados: any[] ): Hospital[] { // Sin instancias

    return resultados;

  }

  private transformarMedicos( resultados: any[] ): Medico[] { // Sin instancias

    return resultados;

  }

  busquedaGlobal( termino: string ) {

    const url = `${base_url}/todo/${termino}`;
    return this.http.get(url);

  }

  buscar( tipo: 'usuarios'|'medicos'|'hospitales',
          termino: string) {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url)
            .pipe(
              map( (res:any) => {

                switch (tipo) {
                  case 'usuarios': {
                    return this.transformarUsuarios(res.resultados);
                  }

                  case 'hospitales': {
                    return this.transformarHospitales(res.resultados);
                  }

                  case 'medicos': {
                    return this.transformarMedicos(res.resultados);
                  }

                  default:
                    return []; // En caso que no coincida
                }

              })
            )
  }

}
