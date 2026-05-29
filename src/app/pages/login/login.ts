import {

  Component,

  ChangeDetectorRef

} from '@angular/core';

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

  // ============================
  // CAMPOS
  // ============================

  email = '';

  password = '';

  // ============================
  // MENSAJES
  // ============================

  mensaje = '';

  // ============================
  // CONSTRUCTOR
  // ============================

  constructor(

    private authService: AuthService,

    private router: Router,

    private cdRef: ChangeDetectorRef

  ) {}

  // ============================
  // LOGIN
  // ============================

  iniciarSesion(): void {

    // ============================
    // LIMPIAR MENSAJE
    // ============================

    this.mensaje = '';

    // ============================
    // VALIDACIONES
    // ============================

    if (!this.email.trim()) {

      this.mensaje =
        'Introduce un email';

      return;

    }

    if (!this.password.trim()) {

      this.mensaje =
        'Introduce una contraseña';

      return;

    }

    // ============================
    // LOGIN API
    // ============================

    this.authService
      .login(

        this.email,

        this.password

      )

      .subscribe({

        // ============================
        // LOGIN CORRECTO
        // ============================

        next: (respuesta: any) => {

          console.log(
            'LOGIN OK:',
            respuesta
          );

          // ============================
          // LIMPIAR MENSAJE
          // ============================

          this.mensaje = '';

          // ============================
          // LIMPIAR FORMULARIO
          // ============================

          this.email = '';

          this.password = '';

          // ============================
          // REFRESCAR VISTA
          // ============================

          this.cdRef.detectChanges();

          // ============================
          // REDIRECCIÓN
          // ============================

          this.router.navigate(['/']);

        },

        // ============================
        // ERROR LOGIN
        // ============================

        error: (error) => {

          console.error(error);

          // ============================
          // ERROR 401
          // ============================

          if (error.status === 401) {

            this.mensaje =

              error.error?.mensaje ||

              'Email o contraseña incorrectos';

          }

          // ============================
          // ERROR CONEXIÓN
          // ============================

          else if (error.status === 0) {

            this.mensaje =
              'No se puede conectar con el servidor';

          }

          // ============================
          // OTROS ERRORES
          // ============================

          else {

            this.mensaje =
              'Error al iniciar sesión';

          }

          // ============================
          // REFRESCAR VISTA
          // ============================

          this.cdRef.detectChanges();

        }

      });

  }

}