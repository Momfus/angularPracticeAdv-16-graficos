import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  // Armado de menú (cada uno con un ícono y opciones hijas)
  menu: any[] = [

    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [ // Sacadas del pages.routing.ts
        { titulo: 'Main', url: '/'},
        { titulo: 'ProgressBar', url: 'progress'},
        { titulo: 'Grafica', url: 'grafica1'},
      ]
    }

  ];

  constructor() { }
}
