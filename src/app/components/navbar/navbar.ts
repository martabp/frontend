import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { BackendService } from '../../services/backend';

@Component({

  selector: 'app-navbar',
  standalone: true,
  imports: [

    RouterLink,
    CommonModule

  ],

  templateUrl: './navbar.html',
  styleUrl: './navbar.css'

})

export class Navbar {

  constructor(

    public authService:
      AuthService,

    public backendService:
      BackendService,

    private router:
      Router

  ) {}

  // ============================
  // LOGOUT
  // ============================

  logout(): void {

    this.authService.logout();
    this.router.navigate(['/']);

  }

}