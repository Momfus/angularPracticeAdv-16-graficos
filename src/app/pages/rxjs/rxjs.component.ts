import { Component } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {

    // this.retornaObservable().pipe(

    //   retry(2) // Es para seguir intentando subscribirse hasta que lo logre (si se envía sin argumentos, sino se marca la cantidad)

    // ).subscribe(

    //   valor => console.log('Subs: ', valor),
    //   error => console.warn('Error', error),
    //   () => console.info('Obs terminado')

    // );

    this.retornaIntervalo()
      .subscribe(
        console.log // De esta manera manda todos los argumentos a la función definida sin mucha anotación
      )

  }

  retornaIntervalo(): Observable<number> {

    return interval( 500 ) // Esto permite hacer lo que está comentado en el constructor de manera más sencilla.
      .pipe( // Se coloca los operadores de abajo en el orden que se requiere
        take(10), // Dice cuantas emisiones del llamado subscripto se requieren y se detiene
        map( valor => { // map sirve para transformar la información del obserrvable y mutarla en la que se necesita
          return valor + 1;
        }),
        filter( valor => ( valor % 2 === 0)? true: false ), // Detectar si es par o impar, de ser par mostrar el valor
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
