import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  // Realizo la selección del elemento del id del tema general que está en el index (con id=theme). Nota: no poner otro id en el proyecto con ese id
  public linkTheme = document.querySelector('#theme'); // Mejor que se haga una vez la búsqueda del DOM, asi no tiene que estar buscandose de nuevo cada vez que se hace click

  // Obtener la clase que tenga en el documento como seleccionado
  public links !: NodeListOf<Element>; // Para tener la referencia al momento de inicializarse correctamente, está en onInit su valor inicial

  // Nota: por el caracter antes del tipo '!:' es por esto https://www.stevefenton.co.uk/2018/01/typescript-definite-assignment-assertions/
  // Se podría haber resuelto sino inicializando el valor en el constructor

  constructor() {

  }

  ngOnInit(): void {

    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();

  }

  changeTheme( theme: string ) {

    const url = `./assets/css/colors/${ theme }.css`;

    this.linkTheme?.setAttribute('href', url); // Esto es javascriot vainilla, el '?' es de buena práctica para preguntar si existe accedder a su atributo para setearlo.

    // Guardar localmente el tema elegido
    localStorage.setItem('theme', url);

    // Mostrar el seleccionado con el "tick"
    this.checkCurrentTheme();

  }

  checkCurrentTheme() {

    // Se borra la clase working por si vuelve el usuario y elige otra opción
    this.links.forEach( (elem: Element) => {// lista de elementos html

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
