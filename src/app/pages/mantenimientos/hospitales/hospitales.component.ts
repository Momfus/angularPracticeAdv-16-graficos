import { Component, OnInit, OnDestroy } from '@angular/core';

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
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];

  public sinHospitales: boolean = false;
  public cargando: boolean = true;
  public totalHospitales: number = 0;
  public desde: number = 0;
  public limite: number = 5;

  public pageOffset: number = this.limite;

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

  ngOnDestroy(): void {
      this.imgSubs.unsubscribe();
  }

  cargarHospitales() {

    this.cargando = true;
    this.hospitalService.cargarHospitales(this.desde, this.limite)
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

    Swal.fire({
      title: '¿Borrar hospital?',
      text: `Esta a punto de borrar a ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo'
    }).then( (result) => {

      if( result.isConfirmed && hospital._id !== undefined ) {

        this.hospitalService.borrarHospital( hospital._id)
            .subscribe( res => {

              // Para volver a la página anterior si el total de usuarios en la actual ya no existe y no es la primera página
              if( this.desde === (this.totalHospitales - 1 ) && this.desde != 0 ){
                this.desde -= this.pageOffset;
              }

              this.cargarHospitales();
              Swal.fire(

                'Hospital borrado',
                `${hospital.nombre} fue eliminado correctamente`,
                'success'

              )

            });
      }

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
      this.sinHospitales = this.hospitales.length === 0 ? true : false;
      return;
    }

    this.busquedaService.buscar('hospitales', termino)
      .subscribe( res => {
        this.hospitales = res as Hospital[];
        this.sinHospitales = res.length === 0 ? true : false;
      });


  }

}
