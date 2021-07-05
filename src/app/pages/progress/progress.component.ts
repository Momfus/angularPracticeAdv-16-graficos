import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {

  progreso: number = 50;

  cambiarValor( valor: number): number {

    if( this.progreso >= 100 && valor >= 0 ) {
      return this.progreso = 100; // Mantiene el valor a 100 al superarlo y sale de la función
    }

    if( this.progreso <= 0 && valor < 0 ) {
      return this.progreso = 0; // En caso de bajarse el valor a menos cero, se queda en cero, sino continua
    }

    return this.progreso = this.progreso + valor;

  }

  // Getters
  get getPorcentaje() {
    return `${this.progreso}%`
  }

}
