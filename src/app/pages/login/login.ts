import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService }
from '../../services/auth.service';

@Component({
  selector: 'app-login',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './login.html',

  styleUrls: ['./login.css']
})
export class Login {

  email = '';
  password = '';
  mensaje = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // ============================
  // LOGIN
  // ============================

  iniciarSesion(): void {

    if (!this.email.trim()) {

      this.mensaje =
        'Introduce un usuario';

      return;
    }

    this.authService
      .login(this.email,this.password)

      .subscribe({

        next: () => {

          this.router.navigate(['/']);
        },

        error: () => {

          this.mensaje =
            'Error al iniciar sesión';
        }
      });
  }
}