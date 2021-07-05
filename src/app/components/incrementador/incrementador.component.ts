import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent {

  @Input('valor') progreso: number = 50; // Para renombrar argumento a 'valor' (si queda vació se llamaria progreso desde el padre)

  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

  cambiarValor( valor: number): number {

    if( this.progreso >= 100 && valor >= 0 ) {
      this.valorSalida.emit(100);
      return this.progreso = 100; // Mantiene el valor a 100 al superarlo y sale de la función
    }

    if( this.progreso <= 0 && valor < 0 ) {
      this.valorSalida.emit(0);
      return this.progreso = 0; // En caso de bajarse el valor a menos cero, se queda en cero, sino continua
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);

    return this.progreso;

  }


}
