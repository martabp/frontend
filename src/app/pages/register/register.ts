import {

  Component,

  ChangeDetectorRef

} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

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

    private router: Router,

    private cdRef: ChangeDetectorRef

  ) {}

  // ==========================================
  // REGISTRAR
  // ==========================================

  registrar(): void {

    // ==========================================
    // LIMPIAR MENSAJES
    // ==========================================

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

        next: (respuesta: any) => {

          console.log(
            'RESPUESTA OK:',
            respuesta
          );

          // =========================
          // LIMPIAR ERROR
          // =========================

          this.mensajeError = '';

          // =========================
          // MENSAJE ÉXITO
          // =========================

          this.mensajeExito =

            respuesta.body?.mensaje ||

            respuesta.mensaje ||

            'Usuario registrado correctamente';

          // =========================
          // LIMPIAR FORMULARIO
          // =========================

          this.usuario = {

            nombre: '',

            email: '',

            password: ''

          };

          // =========================
          // REFRESCAR VISTA
          // =========================

          this.cdRef.detectChanges();

        },

        // ======================================
        // ERROR
        // ======================================

        error: (error) => {

          console.error(error);

          // =========================
          // LIMPIAR ÉXITO
          // =========================

          this.mensajeExito = '';

          // =========================
          // ERROR 400
          // =========================

          if (error.status === 400) {

            this.mensajeError =

              error.error?.mensaje ||

              'El email ya está registrado';

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

          // =========================
          // REFRESCAR VISTA
          // =========================

          this.cdRef.detectChanges();

        }

      });

  }

}