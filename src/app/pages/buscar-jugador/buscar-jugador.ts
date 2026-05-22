import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

import { ApiFootballService }
from '../../services/api-football';

@Component({
  selector: 'app-buscar-jugador',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './buscar-jugador.html',

  styleUrl: './buscar-jugador.css'
})

export class BuscarJugador {

  nombre: string = '';

  liga: string = '39';

  season: string = '2024';

  resultados: any[] = [];

  cargando: boolean = false;

  mensaje: string = '';

  constructor(
    private apiFootballService: ApiFootballService,
    private cdr: ChangeDetectorRef
  ) {}

  // ========================================
  // BUSCAR JUGADORES
  // ========================================

buscarJugador() {

  this.resultados = [];
  this.mensaje = '';
  this.cargando = true;

  this.apiFootballService.buscarJugador(
    this.nombre,
    this.liga,
  
  ).subscribe({

    next: (res: any) => {

      const data = res?.response ?? [];

      // 🔥 FORZAR RENDER INMEDIATO
      this.cargando = false;

      this.resultados = [...data];

      this.mensaje =
        data.length === 0
          ? '❌ No se encontraron jugadores'
          : '';

      // 💥 FORZAR DETECCIÓN DE CAMBIOS
      this.cdr.detectChanges();

    },

    error: () => {

      this.cargando = false;
      this.resultados = [];
      this.mensaje = '❌ Error en la búsqueda';

      this.cdr.detectChanges();

    }

  });

}

  // ========================================
  // IMPORTAR JUGADOR
  // ========================================

  importarJugador(jugadorApi: any) {

    const jugador = {

      nombre: jugadorApi.player.name,

      equipo:
        jugadorApi.statistics[0]?.team?.name,

      liga:
        jugadorApi.statistics[0]?.league?.name,

      nacionalidad:
        jugadorApi.player.nationality,

      edad:
        jugadorApi.player.age,

      posicion:
        jugadorApi.statistics[0]?.games?.position,

      imagen:
        jugadorApi.player.photo,

      origen: 'API_FOOTBALL'

    };

    this.apiFootballService
      .importarJugador(jugador)
      .subscribe({

        next: () => {

          alert('Jugador importado correctamente');

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

}