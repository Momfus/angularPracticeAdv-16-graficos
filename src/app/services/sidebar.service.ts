import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [];

  cargarMenu(){
    this.menu = JSON.parse( localStorage.getItem('menu') || '');
  };
  // Ahora se trae lo de abajo desde el servidor
  // Armado de menú (cada uno con un ícono y opciones hijas)
  // menu: any[] = [

  //   {
  //     titulo: 'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [ // Sacadas del pages.routing.ts
  //       { titulo: 'Main', url: '/'},
  //       { titulo: 'Grafica', url: 'grafica1'},
  //       { titulo: 'Rxjs', url: 'rxjs'},
  //       { titulo: 'ProgressBar', url: 'progress'},
  //       { titulo: 'Promesas', url: 'promesas'},
  //     ]
  //   },

  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [ // Sacadas del pages.routing.ts
  //       { titulo: 'Usuarios', url: 'usuarios'},
  //       { titulo: 'Hospitales', url: 'hospitales'},
  //       { titulo: 'Médicos', url: 'medicos'},
  //     ]
  //   }

  // ];
  // constructor() { }

}
