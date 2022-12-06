

interface _HospitalUser { // Se usará solo aca

  _id: string;
  nombre: string;
  img: string;

}

// Podria ser parecido al de usuario con el get imagen pero es para tener otra forma de resolución
// Las interfaces son mas ligeras que las clases
// Interfaz cuando solo necesito una estructura, clases es cuando requiero que tengan metodos (como get y set)
export class Hospital {

  constructor(
    public nombre: string,
    public _id?: string,
    public img?: string,
    public usuario?: _HospitalUser,
  ) {}

}

export interface CargarHospital {
  total: number
  hospitales:Hospital[],
}

export interface Hospitales {
  ok: boolean,
  hospitales:Hospital[],
  usuario: _HospitalUser
}

