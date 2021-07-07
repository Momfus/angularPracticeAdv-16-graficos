import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  labels1: string[] = ['Yerba', 'Tortitas ', 'Azucar'];
  data1: Array<Array<number>> = [
    [700, 450, 100]
  ];


}
