import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../../models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public totalHospitales: number = 0;
  public desde: number = 0;

  public pageOffset: number = 5;


  constructor( private hospitalService: HospitalService ) {

  }

  ngOnInit(): void {

    this.cargarHospitales();

  }

  cargarHospitales() {

    this.cargando = true;
    this.hospitalService.cargarHospitales(this.desde)
      .subscribe( res => {

        this.cargando = false;
        this.hospitales = res.hospitales;
        this.totalHospitales = res.total;

      });

  }

  cambiarPagina( valor: number ) {

    this.desde += valor;

    if( this.desde < 0 ) {
      this.desde = 0;
    } else if( this.desde >= this.totalHospitales ){

      this.desde -= valor;

    }

    this.cargarHospitales();

  }

}
