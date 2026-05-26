import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { AuthService }
from '../../services/auth.service';

@Component({
  selector: 'app-register',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './register.html',

  styleUrls: ['./register.css']
})

export class RegisterComponent {

  // ==========================================
  // USUARIO
  // ==========================================

  usuario = {

    username: '',

    password: ''

  };

  // ==========================================
  // MENSAJES
  // ==========================================

  mensajeExito = '';

  mensajeError = '';

  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  constructor(
    private authService: AuthService
  ) {}

  // ==========================================
  // REGISTRAR
  // ==========================================

  registrar(): void {

    this.mensajeExito = '';

    this.mensajeError = '';

    /*
     * Validación mínima.
     */
    if (
      !this.usuario.username ||
      !this.usuario.password
    ) {

      this.mensajeError =
        'Debe completar todos los campos';

      return;
    }

    this.authService
      .registrar(this.usuario)

      .subscribe({

        next: () => {

          this.mensajeExito =
            'Usuario registrado correctamente';

          /*
           * Limpiar formulario.
           */
          this.usuario = {

            username: '',

            password: ''

          };

        },

        error: (error) => {

          console.error(error);

          if (error.status === 400) {

            this.mensajeError =
              'El usuario ya existe';

          } else if (error.status === 0) {

            this.mensajeError =
              'No se puede conectar con el servidor';

          } else {

            this.mensajeError =
              'Error al registrar usuario';

          }

        }

      });

  }

}