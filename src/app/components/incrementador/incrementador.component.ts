import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{

  @Input('valor') progreso: number = 50; // Para renombrar argumento a 'valor' (si queda vació se llamaria progreso desde el padre)
  @Input() btnClass: string = 'btn-primary'; // Para asignar clases desde el padre para utilizar en este componente

  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.btnClass = `btn ${ this.btnClass }` // Al momento de crearse, se concatena con el atributo btnClass recibido
  }

  cambiarValor( valor: number): number {

    this.progreso = this.progreso + valor;

    if( this.progreso >= 100 && valor >= 0 ) {
      this.valorSalida.emit(100);
      this.progreso = 100; // Mantiene el valor a 100 al superarlo y sale de la función
    }

    if( this.progreso <= 0 && valor < 0 ) {
      this.valorSalida.emit(0);
      this.progreso = 0; // En caso de bajarse el valor a menos cero, se queda en cero, sino continua
    }

    this.valorSalida.emit(this.progreso);

    return this.progreso;

  }

  onChange( nuevoValor: any ) {

    if( nuevoValor >= 100 ) {
      this.progreso = 100;
    } else if( nuevoValor <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }

    this.valorSalida.emit( this.progreso );

  }

}
