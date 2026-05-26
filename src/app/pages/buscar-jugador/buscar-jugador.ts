import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

import { ApiFootballService } from '../../services/api-football';

import { JugadoresService } from '../../services/jugadores';

@Component({
  selector: 'app-buscar-jugador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscar-jugador.html'
})

export class BuscarJugador {

  nombre: string = '';

  season: number = 2024;

  liga: number = 39;

  resultados: any[] = [];

  cargando: boolean = false;

  mensaje: string = '';

  constructor(

  private apiFootballService:
    ApiFootballService,

  private jugadoresService:
    JugadoresService,

  private cdr:
    ChangeDetectorRef

) {}

  buscarJugador() {

    console.log('CLICK BUSCAR OK');

    this.cargando = true;

    this.resultados = [];

    this.mensaje = '';

    this.apiFootballService.buscarJugador(

      this.nombre,

      this.season,

      this.liga

    ).subscribe({

      next: (res: any) => {

        console.log(
          'RESPUESTA OK:',
          res
        );

        this.resultados = res?.data ?? [];

if (this.resultados.length === 0) {

  this.mensaje =
    'No se encontraron jugadores';

} else {

  this.mensaje = '';

}
        setTimeout(() => { this.cdr.detectChanges();});

        this.cargando = false;

      },

      error: (err) => {

        console.log(
          'ERROR BACKEND:',
          err
        );

        this.cargando = false;

        this.mensaje =
          'Error al buscar jugadores';

      }

    });

  }

importarJugador(jugador: any) {

  this.cargando = true;

  this.mensaje = '';

  this.jugadoresService
    .crearJugador(jugador)
    .subscribe({

      next: (res: any) => {

        console.log(
          'IMPORTADO OK:',
          res
        );
        
        setTimeout(() => {

  this.cargando = false;

  this.mensaje =
    'Jugador importado correctamente';

  this.cdr.detectChanges();
  window.location.reload();

});

        this.mensaje =
          'Jugador importado correctamente';

      },

      error: (err) => {

        console.log(
          'ERROR IMPORTAR:',
          err
        );

        this.cargando = false;

        this.mensaje =
          'Error al importar jugador';

      }

    });

}

}