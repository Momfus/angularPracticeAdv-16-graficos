import { Component } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './notpagefound.component.html',
  styleUrls: ['./notpagefound.component.css']
})
export class NotpagefoundComponent {

  year = new Date().getFullYear(); // Obtener el año actual

}
