import { environment } from '../environments/environment.prod';
import { Hospital } from './hospital.model';
// "_id": "6349dc4f97a0a74b23fd9d8b",
// "nombre": "Medico 3",
// "usuario": null,
// "hospital": null,
// "img": "92e985dc-ec56-462c-af04-6a08eb815f66.png"

const base_url = environment.base_url;

interface _MedicoUser { // Se usará solo aca

  _id: string;
  nombre: string;
  img: string;

}


export class Medico {

  constructor(

    public _id: string,
    public nombre: string,
    public usuario?: _MedicoUser,
    public hospital?: Hospital,
    public img?: string

  ) {

  }

}
