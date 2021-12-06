import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent {

  public titulo!: string; // El símbolo "!" es para que no haga falta asignarle valor al momento de declararlo

  constructor( private router: Router ) {
    this.getArgumentosRuta();
  }

  getArgumentosRuta() {

    this.router.events
    .pipe(
      filter<any>(event => event instanceof ActivationEnd),
      filter( (event2: ActivationEnd) => event2.snapshot.firstChild === null ), // Obtener el primero que es el padre con el título que requerimos de la data
      map( (event: ActivationEnd)  => event.snapshot.data)
    )
    .subscribe( ({title}) => { // con ({title}) desesctructuramos el dato para tener el valor que queremos

      this.titulo = title;
      document.title = `AdminPro - ${title}`; // Así cambia el nombre de la pestaña del navegador

    });

  }

}
