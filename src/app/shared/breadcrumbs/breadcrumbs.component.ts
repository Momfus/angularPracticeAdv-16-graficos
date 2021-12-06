import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo!: string; // El símbolo "!" es para que no haga falta asignarle valor al momento de declararlo
  public tituloSubs$!: Subscription;

  constructor( private router: Router) {

    this.tituloSubs$ = this.getArgumentosRuta()
                        .subscribe( ({title}) => { // con ({title}) desesctructuramos el dato para tener el valor que queremos

                          this.titulo = title;
                          document.title = `AdminPro - ${title}`; // Así cambia el nombre de la pestaña del navegador

                        });
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta() {

    return this.router.events
    .pipe(
      filter<any>(event => event instanceof ActivationEnd),
      filter( (event2: ActivationEnd) => event2.snapshot.firstChild === null ), // Obtener el primero que es el padre con el título que requerimos de la data
      map( (event: ActivationEnd)  => event.snapshot.data)
    )

  }

}
