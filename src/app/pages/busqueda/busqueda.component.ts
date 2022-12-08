import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';

import { Hospital } from 'src/models/hospital.model';
import { Medico } from '../../../models/medico.model';
import { Usuario } from 'src/models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedaService: BusquedasService,
    private router: Router,
  ) {}


  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe( ({termino}) => this.busquedaGlobal(termino) )

  }

  busquedaGlobal( termino: string) {

    this.busquedaService.busquedaGlobal( termino )
        .subscribe( (res: any) => {
          console.log(res);

          this.usuarios = res.usuarios;
          this.medicos = res.medicos;
          this.hospitales = res.hospitales;

        })

  }

  abrirMedico( medico: Medico ) {

    this.router.navigateByUrl(`/dashboard/medico/${ medico._id }`);

  }

}
