import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { ApiFootballService } from '../../services/api-football';

@Component({
  selector: 'app-jugadores',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './jugadores.html',
  styleUrls: ['./jugadores.css']
})

export class JugadoresComponent implements OnInit {

  // =====================================================
  // LISTA JUGADORES
  // =====================================================

  jugadores: any[] = [];

  // =====================================================
  // MENSAJES
  // =====================================================

  mensajeExito: string = '';

  mensajeError: string = '';

  // =====================================================
  // NUEVO JUGADOR
  // =====================================================

  nuevoJugador: any = {

    nombre: '',
    edad: null,
    nacionalidad: '',
    posicion: '',
    equipo: '',
    liga: '',
    temporada: '',
    foto: ''

  };

  // =====================================================
  // JUGADOR SELECCIONADO
  // =====================================================

  jugadorSeleccionado: any = {

    _id: '',
    nombre: '',
    edad: null,
    nacionalidad: '',
    posicion: '',
    equipo: '',
    liga: '',
    temporada: '',
    foto: ''

  };

  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private apiService: ApiFootballService
  ) { }

  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.obtenerJugadores();

  }

  // =====================================================
  // OBTENER JUGADORES
  // =====================================================

  obtenerJugadores(): void {

    this.apiService.obtenerJugadores()
      .subscribe({

        next: (data: any) => {

          console.log(
            'JUGADORES BACKEND:',
            data
          );

          this.jugadores = data.data;

        },

        error: (error: any) => {

          console.error(error);

          this.mensajeError =
            'Error obteniendo jugadores';

         

        }

      });

  }

  // =====================================================
  // CREAR JUGADOR
  // =====================================================

  crearJugador(): void {

    // LIMPIAR MENSAJES

  
    this.mensajeExito = '';



    // =====================================
    // VALIDACIONES FRONTEND
    // =====================================

    const camposFaltantes: string[] = [];

    if (!this.nuevoJugador.nombre) {

      camposFaltantes.push('Nombre');

    }

    if (!this.nuevoJugador.edad) {

      camposFaltantes.push('Edad');

    }

    if (!this.nuevoJugador.nacionalidad) {

      camposFaltantes.push('Nacionalidad');

    }

    if (!this.nuevoJugador.posicion) {

      camposFaltantes.push('Posición');

    }

    if (!this.nuevoJugador.equipo) {

      camposFaltantes.push('Equipo');

    }

    if (!this.nuevoJugador.liga) {

      camposFaltantes.push('Liga');

    }

    if (!this.nuevoJugador.temporada) {

      camposFaltantes.push('Temporada');

    }

    if (!this.nuevoJugador.foto) {

      camposFaltantes.push('Foto');

    }

    // =====================================
    // CAMPOS VACÍOS
    // =====================================

    if (camposFaltantes.length > 0) {

      this.mensajeError =
        'Faltan campos obligatorios: ' +
        camposFaltantes.join(', ');

    

      return;

    }

    // =====================================
    // PETICIÓN POST
    // =====================================

    this.apiService
      .crearJugador(this.nuevoJugador)
      .subscribe({

        next: () => {

          this.mensajeExito =
            'Jugador creado correctamente';

          this.mensajeError = '';

          // RECARGAR LISTA

          this.obtenerJugadores();

          // LIMPIAR FORMULARIO

          this.nuevoJugador = {

            nombre: '',
            edad: null,
            nacionalidad: '',
            posicion: '',
            equipo: '',
            liga: '',
            temporada: '',
            foto: ''

          };

          // LIMPIAR MENSAJE

        

        },

        error: (error: any) => {

          console.error(error);

          this.mensajeExito = '';

          // =====================================
          // ERRORES VALIDACIÓN SPRING
          // =====================================

          if (error.error?.errores) {

            const listaErrores = Object.values(
              error.error.errores
            );

            this.mensajeError =
              listaErrores.join(' | ');

          }

          // =====================================
          // MENSAJE SIMPLE
          // =====================================

          else if (error.error?.mensaje) {

            this.mensajeError =
              error.error.mensaje;

          }

          // =====================================
          // ERROR GENÉRICO
          // =====================================

          else {

            this.mensajeError =
              'Error creando jugador';

          }

          // LIMPIAR MENSAJE

         

        }

      });

  }

  // =====================================================
  // SELECCIONAR JUGADOR
  // =====================================================

  seleccionarJugador(jugador: any): void {

    this.jugadorSeleccionado =
      { ...jugador };

  }

  // =====================================================
  // EDITAR JUGADOR
  // =====================================================

  editarJugador(): void {

    // LIMPIAR MENSAJES

    this.mensajeExito = '';

    this.mensajeError = '';

    this.apiService
      .actualizarJugador(
        this.jugadorSeleccionado._id,
        this.jugadorSeleccionado
      )
      .subscribe({

        next: () => {

          this.mensajeExito =
            'Jugador actualizado correctamente';

          this.mensajeError = '';

          this.obtenerJugadores();

         

        },

        error: (error: any) => {

          console.error(error);

          this.mensajeExito = '';

          // VALIDACIONES SPRING

          if (error.error?.errores) {

            const listaErrores = Object.values(
              error.error.errores
            );

            this.mensajeError =
              listaErrores.join(' | ');

          }

          else if (error.error?.mensaje) {

            this.mensajeError =
              error.error.mensaje;

          }

          else {

            this.mensajeError =
              'Error actualizando jugador';

          }

         

        }

      });

  }

  // =====================================================
  // ELIMINAR JUGADOR
  // =====================================================

  eliminarJugador(id: string): void {

    // LIMPIAR MENSAJES

    this.mensajeError = '';
    this.mensajeExito = '';

    const confirmar = confirm(
      '¿Seguro que deseas eliminar este jugador?'
    );

    if (!confirmar) {

      return;

    }

    this.apiService
      .eliminarJugador(id)
      .subscribe({

        next: () => {
          this.mensajeError = '';
          this.mensajeExito =
            'Jugador eliminado correctamente';

         

          this.obtenerJugadores();

       

        },

        error: (error: any) => {

          console.error(error);

          this.mensajeExito = '';

          this.mensajeError =
            error.error?.mensaje ||
            'Error eliminando jugador';

     

        }

      });

  }

}