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

  constructor() { }

  ngOnInit(): void {
  }

  changeTheme( theme: string ) {

    const url = `./assets/css/colors/${ theme }.css`;

    this.linkTheme?.setAttribute('href', url); // Esto es javascriot vainilla, el '?' es de buena práctica para preguntar si existe accedder a su atributo para setearlo.

    // Guardar localmente el tema elegido
    localStorage.setItem('theme', url);


  }

}
