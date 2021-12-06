import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {

    this.retornaObservable().pipe(

      retry(2) // Es para seguir intentando subscribirse hasta que lo logre (si se envía sin argumentos, sino se marca la cantidad)

    ).subscribe(

      valor => console.log('Subs: ', valor),
      error => console.warn('Error', error),
      () => console.info('Obs terminado')


    );

  }

  retornaObservable(): Observable<number>{

    let i = -1;

    //  obs$  // Para observable se usa el estandar de ponerler un signo $ para diferenciarlo
    return new Observable<number>( observer => {

      const intervalo = setInterval( () => {

        i++;
        observer.next(i); // El siguiente valor a emitir a los que se han subscripto

        if( i === 4 ) {
          clearInterval( intervalo ); // Se limpia para que no continue el intervalo
          observer.complete(); // Termina la subscripción
        }

        if( i === 2 ) {
          observer.error('i llegó al valor de 2');
        }

      }, 1000);

    });

  }

}
