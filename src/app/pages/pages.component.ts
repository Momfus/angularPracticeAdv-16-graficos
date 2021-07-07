import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

// Defino que es una función global (para que no genere error al buscarlo); se define el valor de retorno vacio para no gerar error
declare function customInitFunction(): void;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    customInitFunction(); // Funcion global en assets/js/custom.js
  }



}
