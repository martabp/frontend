import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { JugadoresComponent } from './pages/jugadores/jugadores';
import { BuscarJugador }  from './pages/buscar-jugador/buscar-jugador';
import { DwscDashboard } from './pages/dwsc-dashboard/dwsc-dashboard';
import { Login } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';

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
  },
  {
  path: 'dwsc-dashboard',
  component: DwscDashboard
},
{
  path: 'login',
  component: Login
},
{
  path: 'register',
  component: RegisterComponent
},

];