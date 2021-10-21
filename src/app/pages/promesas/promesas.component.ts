import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // Pruebas
    // // Esta parte es síncrona
    // const promesa = new Promise( ( resolve, reject ) => {

    //   if( false ) {
    //     resolve('Hola Mundo');
    //   } else {
    //     reject('Algo salió mal')
    //   }


    // });

    // // Esta parte es asincrona
    // promesa.then( ( mensaje ) => {

    //   console.log(mensaje);


    // })
    // .catch( error => console.log( 'Error en mi promesa', error ));

    // console.log('Fin del init');

    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
    })
  }

  getUsuarios() {

    return new Promise( resolve => {

      // Retorna una promesa de tipo Response de una solitud http
      fetch('https://reqres.in/api/users')
        .then( res => res.json() ) // Regresa un json al no estar en un cuerpo {...}
        .then( body => resolve(body.data)
      );

    } );
  }

}
