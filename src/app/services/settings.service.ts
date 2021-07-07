import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {


  // Realizo la selección del elemento del id del tema general que está en el index (con id=theme). Nota: no poner otro id en el proyecto con ese id
  private linkTheme = document.querySelector('#theme'); // Mejor que se haga una vez la búsqueda del DOM, asi no tiene que estar buscandose de nuevo cada vez que se hace click

  constructor() {

    // Carga localmente el tema elegido (sino uno por defecto)
    const url: any = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';

    this.linkTheme?.setAttribute('href', url) // Esto es javascriot vainilla, el '?' es de buena práctica para preguntar si existe accedder a su atributo para setearlo.

  }

  changeTheme( theme: string ) {

    const url = `./assets/css/colors/${ theme }.css`;

    this.linkTheme?.setAttribute('href', url); // Esto es javascriot vainilla, el '?' es de buena práctica para preguntar si existe accedder a su atributo para setearlo.

    // Guardar localmente el tema elegido
    localStorage.setItem('theme', url);

    this.checkCurrentTheme(); // Señalar el valor actual elegido

  }

  checkCurrentTheme() {

     // Obtener la clase que tenga en el documento como seleccionado
    const links = document.querySelectorAll('.selector'); // Una forma de mejorar esto es que se recibe la lista de elementos html desde el componente que lo llama (y lo inicializo en ngOnInit)

    // Se borra la clase working por si vuelve el usuario y elige otra opción
    links.forEach( (elem: Element) => {// lista de elementos html

      elem.classList.remove('working');

      // Busco los elementos con sus url de los temas y comparo para ver si es el mismo almacenado que debo ponerle la clase 'working'
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.linkTheme?.getAttribute('href')

      if( btnThemeUrl === currentTheme ) {

        elem.classList.add('working');

      }

    } )

  }


}
