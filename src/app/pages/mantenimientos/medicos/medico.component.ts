import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';

import { CargarHospital, Hospital } from '../../../../models/hospital.model';
import { Medico } from 'src/models/medico.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit, OnDestroy {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];

  public hospitalSeleccionado!: Hospital | undefined;
  public medicoSeleccionado!: Medico | undefined;
  public medicoImg!: string | undefined;

  private imgSubs!: Subscription;

  constructor(
      private fb: FormBuilder,
      private hospitalService: HospitalService,
      private medicoService: MedicoService,
      private modalImagenService: ModalImagenService,
      private router: Router,
      private activateRoute: ActivatedRoute
    ) {

  }

  ngOnInit(): void {

    // Se subscribe al snapshot porque puede cambiar el url
    this.activateRoute.params.subscribe( ( {id} ) => { // Del pages routing es que saca el nombre idal destructurarlo

      this.cargarMedico( id );

    } );

    this.medicoForm = this.fb.group({

      nombre:   ['', Validators.required],
      hospital: ['', Validators.required],

    });

    this.cargarHospitales();

    // Obtener los datos del seleccionado en el select de hospitales
    this.medicoForm.get('hospital')?.valueChanges
        .subscribe( hospitalId => {

          this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId );

        });

    // Cambiar la imagen actual si recibe un cambio
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(50) // Se le agrega un leve delay porque la carga es muy rápida y la recarga se termina antes (al ser pocos datos)
      )
      .subscribe( img => {
        this.medicoImg = img;
      });


  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarMedico( id: string ) {

    if( id === 'nuevo') {
      return; // Al crear un médico, no hace falta buscar
    }

    this.medicoService.obtenerMedicoById(id)
      .pipe(
        delay(50) // obligar esperar un poco para que se carguen los datos correctamente (más que nada por las imagenes)
      )
      .subscribe( medico => {

        // console.log(medico);

        const { nombre, hospital } = medico;

        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: hospital?._id })

        this.medicoImg = this.medicoSeleccionado.img;

        return;

      }, error => {

        // Tal vez es un url de un médico que ya no existe
        return this.router.navigateByUrl(`/dashboard/medicos`);
      });
  }

  cargarHospitales() {

    // Otra forma, ya que hospiales se hace al momento de cargar el singleton, es que se cargue en el mismo servicio y se cargaria solo de ahi
    this.hospitalService.cargarHospitales(0, 0)
      .subscribe( (res: CargarHospital) => {

        this.hospitales = res.hospitales

      });

  }

  guardarMedico() {

    const {nombre} = this.medicoForm.value;

    // Si se tiene un médico seleccionado ACTUALIZAR
    if( this.medicoSeleccionado ) {

      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicoService.actualizarMedico( data )
        .subscribe( res => {

          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');

        });

    } else {

      // CREAR
      this.medicoService.crearMedico( this.medicoForm.value )
          .subscribe( (res: any) => {

            // console.log(res);
            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');

            this.router.navigateByUrl(`/dashboard/medico/${ res.medico._id }`);

          })

    }


  }

  abrirModalImagen() {

    this.modalImagenService.abrirModal('medicos', this.medicoSeleccionado?._id, this.medicoSeleccionado?.img);

  }

}
