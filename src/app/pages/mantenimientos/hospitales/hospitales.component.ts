import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../../models/hospital.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];

  public sinHospitales: boolean = false;
  public cargando: boolean = true;
  public totalHospitales: number = 0;
  public desde: number = 0;

  public pageOffset: number = 5;

  private imgSubs!: Subscription;


  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService
  ) {

  }

  ngOnInit(): void {

    this.cargarHospitales();

    // Cambiar la lista actual si recibe un cambio
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(50) // Se le agrega un leve delay porque la carga es muy rápida y la recarga se termina antes (al ser pocos datos)
      )
      .subscribe( img => {
        this.cargarHospitales();
      }
    );

  }

  cargarHospitales() {

    this.cargando = true;
    this.hospitalService.cargarHospitales(this.desde)
      .subscribe( res => {

        this.cargando = false;
        this.hospitales = res.hospitales;
        this.totalHospitales = res.total;
        this.hospitalesTemp = res.hospitales;

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

  guardarCambios( hospital: Hospital ) {

    if( hospital._id === undefined ) {
      Swal.fire('Error', 'Error con Id undefined', 'error');
      return;
    }

    this.hospitalService.actualizarHospital( hospital._id, hospital.nombre)
        .subscribe( res => {

          Swal.fire('Actualizado', hospital.nombre, 'success');

        });

  }

  eliminarHospital( hospital: Hospital ) {

    if( hospital._id === undefined ) {
      Swal.fire('Error', 'Error con Id undefined', 'error');
      return;
    }

    this.hospitalService.borrarHospital( hospital._id)
        .subscribe( res => {

          this.cargarHospitales();
          Swal.fire('Borrado', hospital.nombre, 'success');

        });

  }

  async abrirSweetAlert() {

    const {value = ''} = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    })

    if( value != undefined && value?.trim().length > 0) {

      this.hospitalService.crearHospital(value)
          .subscribe( (res: any) => {

            this.hospitales.push( res.hospital );

          })

    }

  }

  abrirModal( hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }

  buscar(termino: string) {

    if( termino.length === 0 ) {
      this.hospitales = this.hospitalesTemp; // De esta manera se queda con el total de hospitales (sin búsqueda)
      return;
    }

    this.busquedaService.buscar('hospitales', termino)
      .subscribe( res => {
        this.hospitales = res as Hospital[];
        this.sinHospitales = res.length === 0 ? true : false;
      });


  }

}
