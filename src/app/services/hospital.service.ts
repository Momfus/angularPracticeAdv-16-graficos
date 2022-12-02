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

  constructor(
    private http: HttpClient,
    // private router: Router,
    // private ngZone: NgZone
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

  cargarHospitales( desde: number = 0) {

    // localost:3000/api/usuarios?desde=0
    const url = `${base_url}/hospitales?desde=${ desde }`;
    return this.http.get<CargarHospital>(url, this.headers)
            .pipe(
              map( (res: CargarHospital ) => {
                return {
                  total: res.total,
                  hospitales: res.hospitales
                }
              } )
            );
  }

}
