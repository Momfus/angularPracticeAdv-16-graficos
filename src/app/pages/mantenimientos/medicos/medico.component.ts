import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { CargarHospital, Hospital } from '../../../../models/hospital.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService
    ) {

  }

  ngOnInit(): void {

    this.medicoForm = this.fb.group({

      nombre:   ['Momfus', Validators.required],
      hospital: ['', Validators.required],

    });

    this.cargarHospitales();

  }

  cargarHospitales() {

    // Otra forma, ya que hospiales se hace al momento de cargar el singleton, es que se cargue en el mismo servicio y se cargaria solo de ahi
    this.hospitalService.cargarHospitales(0, 0)
      .subscribe( (res: CargarHospital) => {

        this.hospitales = res.hospitales

      });

  }

  guardarMedico() {
    console.log(this.medicoForm.value);

  }

}
