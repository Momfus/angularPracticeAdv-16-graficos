import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../../models/medico.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  public medicos: Medico[] = [];
  public totalMedicos: number = 0;
  public medicosTemp: Medico[] = [];

  public cargando: boolean = true;
  public desde: number = 0;
  public sinMedicos: boolean = false;
  public pageOffset: number = 5;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService
  ) {

  }

  ngOnInit(): void {

    this.cargarMedicos();
  }

  cargarMedicos() {

    this.cargando = true;
    this.medicoService.cargarMedicos(this.desde)
      .subscribe( res => {

        this.cargando = false;
        this.medicos = res.medicos;
        this.totalMedicos = res.total;

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

}
