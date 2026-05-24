import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { JugadoresComponent } from '../jugadores/jugadores';
import { BuscarJugador } from '../buscar-jugador/buscar-jugador';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-dwsc-dashboard',

  imports: [
    CommonModule,
    JugadoresComponent,
    BuscarJugador,
    RouterLink
  ],

  templateUrl: './dwsc-dashboard.html',

  styleUrl: './dwsc-dashboard.css'
})

export class DwscDashboard {

}