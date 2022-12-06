import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../../models/medico.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public totalMedicos: number = 0;
  public medicosTemp: Medico[] = [];

  public cargando: boolean = true;
  public desde: number = 0;
  public sinMedicos: boolean = false;
  public pageOffset: number = 5;

  private imgSubs!: Subscription;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService
  ) {

  }

  ngOnInit(): void {

    this.cargarMedicos();

    // Cambiar la lista actual si recibe un cambio
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(50) // Se le agrega un leve delay porque la carga es muy rápida y la recarga se termina antes (al ser pocos datos)
    )
    .subscribe( img => {
      this.cargarMedicos();
    }
  );

  }

  ngOnDestroy(): void {
      this.imgSubs.unsubscribe();
  }

  cargarMedicos() {

    this.cargando = true;
    this.medicoService.cargarMedicos(this.desde)
      .subscribe( res => {

        this.cargando = false;
        this.medicos = res.medicos;
        this.totalMedicos = res.total;
        this.medicosTemp = res.medicos;
      });
  }

  buscar( termino: string ) {

    if( termino.length === 0 ) {
      this.medicos = this.medicosTemp; // De esta manera se queda con el total de medicos (sin búsqueda)
      this.sinMedicos = this.medicos.length === 0 ? true : false;
      return;
    }

    this.busquedaService.buscar('medicos', termino)
      .subscribe( res => {
        this.medicos = res as Medico[];
        this.sinMedicos = res.length === 0 ? true : false;
      });

  }

  abrirModal( medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  cambiarPagina( valor: number ) {

    this.desde += valor;

    if( this.desde < 0 ) {
      this.desde = 0;
    } else if( this.desde >= this.totalMedicos ){

      this.desde -= valor;

    }

    this.cargarMedicos();

  }

  borrarMedico(medico: Medico ) {


        Swal.fire({
          title: '¿Borrar médico?',
          text: `Esta a punto de borrar a ${medico.nombre}`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Sí, borrarlo'
        }).then((result) => {
          if (result.isConfirmed) {

            this.medicoService.borrarMedico( medico._id )
                .subscribe( res => {

                    // Para volver a la página anterior si el total de usuarios en la actual ya no existe y no es la primera página
                    if( this.desde === (this.totalMedicos - 1 ) && this.desde != 0 ){
                      this.desde -= this.pageOffset;
                    }

                    this.cargarMedicos(); // Recargar lista y paginación

                    Swal.fire(

                      'Usuario borrado',
                      `${medico.nombre} fue eliminado correctamente`,
                      'success'

                    )

                });


          }
        })

  }

}
