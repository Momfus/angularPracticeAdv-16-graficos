import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarHospital } from 'src/models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  // NOTA: los headers se manejan desde el interceptor

  constructor(
    private http: HttpClient,
  ) { }


  cargarHospitales( desde: number = 0, limite: number = 0) {

    const url = `${base_url}/hospitales?desde=${ desde }&limite=${ limite }`;
    return this.http.get<CargarHospital>(url)
            .pipe(
              map( (res: CargarHospital ) => {
                return {
                  total: res.total,
                  hospitales: res.hospitales
                }
              } )
            );
  }

  crearHospital(nombre: string) {

    const url = `${base_url}/hospitales`;
    return this.http.post(url, { nombre });

  }

  actualizarHospital(_id: string, nombre: string) {

    const url = `${base_url}/hospitales/${ _id }`;
    return this.http.put(url, { nombre });

  }

  borrarHospital(_id: string) {

    const url = `${base_url}/hospitales/${ _id }`;
    return this.http.delete(url);

  }

}
