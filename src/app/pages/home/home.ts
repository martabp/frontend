import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend';


@Component({
  selector: 'app-home',

  
  imports: [
    CommonModule,
    RouterLink
  ],

  templateUrl: './home.html',

  styleUrl: './home.css'
})

export class Home {
  constructor(

  private backendService: BackendService,

  private router: Router

) {}
entrarDWSC(): void {

  this.backendService
    .seleccionarBackend('DWSC');

  this.router.navigate(['/jugadores']);

}

entrarTRWM(): void {

  this.backendService
    .seleccionarBackend('TRWM');

  this.router.navigate(['/jugadores']);

}

}