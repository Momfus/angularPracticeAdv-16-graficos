import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { CargarMedicos, Medico, CargarMedico } from '../../models/medico.model';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
    private http: HttpClient,
  ) { }



  get token(): string {
    return localStorage.getItem('token') || ''; // De no existir el token, retornar string vacio
  }

  get headers() {
    return {
      headers: {
      'x-token': this.token // Utiliza el getter
    }}
  }

  cargarMedicos( desde: number = 0) {

    const url = `${base_url}/medicos?desde=${ desde }`;
    return this.http.get<CargarMedicos>(url, this.headers)
            .pipe(
              map( (res: CargarMedicos ) => {
                return {
                  total: res.total,
                  medicos: res.medicos
                }
              } )
            );
  }

  obtenerMedicoById( id: string ) {

    const url = `${ base_url }/medicos/${ id }`;
    return this.http.get<CargarMedico>( url, this.headers )
                .pipe(
                  map( ( res: CargarMedico ) => { return res.medico })
                )

  }

  crearMedico(medico: { nombre: string, hospital: string } ) {

    const url = `${base_url}/medicos`;
    return this.http.post(url, medico, this.headers);

  }

  actualizarMedico(medico: Medico) {

    const url = `${base_url}/medicos/${ medico._id }`;
    return this.http.put(url, medico, this.headers);

  }


  borrarMedico(_id: string) {

    const url = `${base_url}/medicos/${ _id }`;
    return this.http.delete(url, this.headers);

  }



}