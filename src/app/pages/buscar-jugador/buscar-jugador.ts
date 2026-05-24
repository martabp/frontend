import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiFootballService } from '../../services/api-football';

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

  constructor(private apiFootballService: ApiFootballService) {}
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
      console.log('RESPUESTA OK:', res);

      this.resultados = res?.data ?? [];
      this.cargando = false;
    },

    error: (err) => {
      console.log('ERROR BACKEND:', err);
      this.cargando = false;
    }

  });

}

  importarJugador() {

    this.cargando = true;

    this.apiFootballService.importarJugador().subscribe({

      next: () => {

        this.cargando = false;
        this.mensaje = 'Importación correcta';

        this.buscarJugador();
      },

      error: () => {

        this.cargando = false;
        this.mensaje = 'Error al importar';
      }
    });
  }
}