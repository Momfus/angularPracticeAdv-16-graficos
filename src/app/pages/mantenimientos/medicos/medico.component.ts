import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';

import { CargarHospital, Hospital } from '../../../../models/hospital.model';
import { Medico } from 'src/models/medico.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];

  public hospitalSeleccionado!: Hospital | undefined;
  public medicoSeleccionado!: Medico | undefined;

  constructor(
      private fb: FormBuilder,
      private hospitalService: HospitalService,
      private medicoService: MedicoService,
      private router: Router
    ) {

  }

  ngOnInit(): void {

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

    this.medicoService.crearMedico( this.medicoForm.value )
        .subscribe( (res: any) => {

          console.log(res);
          Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');

          this.router.navigateByUrl(`/dashboard/medico/${ res.medico._id }`);

        })

  }

}
