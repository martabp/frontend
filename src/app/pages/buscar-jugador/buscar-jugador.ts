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

        let respuesta = res;

if (typeof res === 'string') {
  respuesta = JSON.parse(res);
}

let datosApi: any[] = [];

if (Array.isArray(respuesta?.data)) {
  datosApi = respuesta.data;
} else if (Array.isArray(respuesta?.response)) {
  datosApi = respuesta.response;
} else if (typeof respuesta?.data === 'string') {
  const dataParseada = JSON.parse(respuesta.data);
  datosApi = dataParseada.response ?? [];
}

this.resultados = datosApi.map((item: any) => ({

  id: item.player?.id,
  nombre: item.player?.name,
  imagen: item.player?.photo,
  equipo: item.statistics?.[0]?.team?.name,
  liga: item.statistics?.[0]?.league?.name,
  nacionalidad: item.player?.nationality,
  edad: item.player?.age,
  posicion: item.statistics?.[0]?.games?.position,
  datosOriginales: item

}));

if (this.resultados.length === 0) {
  this.mensaje = 'No se encontraron jugadores';
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
        this.mensaje =  'Error al buscar jugadores';
      }
    });
  }

importarJugador(jugador: any) {

  this.cargando = true;

  this.mensaje = '';

this.apiFootballService
  .importarJugador(
    jugador.id,
    this.season
  )

    .subscribe({

      next: (res: any) => {

        console.log(
          'IMPORTADO OK:',
          res
        );

        this.cargando = false;

        this.mensaje =
          'Jugador importado correctamente';

        this.cdr.detectChanges();

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