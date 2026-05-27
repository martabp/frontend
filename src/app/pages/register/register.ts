import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router }
from '@angular/router';

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

    nombre: '',

    email: '',

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

    private authService: AuthService,

    private router: Router

  ) {}

  // ==========================================
  // REGISTRAR
  // ==========================================

  registrar(): void {

    // Limpiar mensajes
    this.mensajeExito = '';

    this.mensajeError = '';

    /*
     * Validación mínima
     */
    if (

      !this.usuario.nombre ||

      !this.usuario.email ||

      !this.usuario.password

    ) {

      this.mensajeError =
        'Debe completar todos los campos';

      return;
    }

    // ==========================================
    // LLAMADA API
    // ==========================================

    this.authService
      .registrar(this.usuario)

      .subscribe({

        // ======================================
        // ÉXITO
        // ======================================
   
     next: () => {

  // Limpiar error
  this.mensajeError = '';

  // Mostrar éxito
  this.mensajeExito =
    'Usuario registrado correctamente';

  /*
   * Limpiar formulario
   */
  this.usuario.nombre = '';

  this.usuario.email = '';

  this.usuario.password = '';

},
        // ======================================
        // ERROR
        // ======================================

        error: (error) => {

          console.error(error);

          // Limpiar éxito
          this.mensajeExito = '';

          // =========================
          // ERROR 400
          // =========================

          if (error.status === 400) {

            if (
              typeof error.error ===
              'string'
            ) {

              this.mensajeError =
                error.error;

            } else {

              this.mensajeError =
                'El email ya está registrado';

            }

          }

          // =========================
          // ERROR CONEXIÓN
          // =========================

          else if (error.status === 0) {

            this.mensajeError =
              'No se puede conectar con el servidor';

          }

          // =========================
          // OTROS ERRORES
          // =========================

          else {

            this.mensajeError =
              'Error al registrar usuario';

          }

        }

      });

  }

}