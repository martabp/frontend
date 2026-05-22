import { Routes } from '@angular/router';

import { Home } from './pages/home/home';

import { JugadoresComponent } from './pages/jugadores/jugadores';

import { BuscarJugador } 
from './pages/buscar-jugador/buscar-jugador';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },

 {
  path: 'jugadores',
  component: JugadoresComponent
},

  {
    path: 'buscar-jugador',
    component: BuscarJugador
  }

];