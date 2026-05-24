import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiFootballService } from '../../services/api-football';
import { ComentariosService } from '../../services/comentarios.service';
import { AuthService } from '../../services/auth.service';

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

  // ==========================================
  // LISTAS
  // ==========================================

  jugadores: any[] = [];
  jugadoresOriginales: any[] = [];

  // ==========================================
  // BÚSQUEDAS
  // ==========================================

  busquedaNombre = '';
  busquedaEquipo = '';
  busquedaFecha = '';

  // ==========================================
  // EDICIÓN
  // ==========================================

  jugadorEditando: any = null;

  // ==========================================
  // MENSAJES
  // ==========================================

  mensajeExito = '';
  mensajeError = '';

  // ==========================================
// COMENTARIOS
// ==========================================

comentarios: any = {};
nuevoComentario: any = {};
mostrarComentarios: any = {};
  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  constructor(
    private apiFootballService: ApiFootballService,
    private cdRef: ChangeDetectorRef,
    private comentariosService: ComentariosService,
     public authService: AuthService
  ) {}

  // ==========================================
  // INICIO
  // ==========================================

  ngOnInit(): void {

    this.obtenerJugadores();

  }

  // ==========================================
  // OBTENER JUGADORES
  // ==========================================

  obtenerJugadores(): void {

    this.apiFootballService.obtenerJugadores()
      .subscribe({

        next: (respuesta: any) => {

          this.jugadores = [...respuesta.data];

          this.jugadoresOriginales =
            [...respuesta.data];

          this.cdRef.detectChanges();

        },

        error: (error) => {

          console.error(error);

          this.mensajeError =
            'Error al obtener jugadores';

        }

      });

  }

  // ==========================================
  // FILTRAR JUGADORES
  // ==========================================

  filtrarJugadores(): void {

    const nombre =
      this.busquedaNombre.toLowerCase();

    const equipo =
      this.busquedaEquipo.toLowerCase();

    const fecha =
      this.busquedaFecha;

    this.jugadores =
      this.jugadoresOriginales.filter(
        jugador => {

          const coincideNombre =
            jugador.nombre
              .toLowerCase()
              .includes(nombre);

          const coincideEquipo =

            jugador.equipo
              .toLowerCase()
              .includes(equipo)

            ||

            jugador.liga
              .toLowerCase()
              .includes(equipo);

          const coincideFecha =

            !fecha ||

            jugador.fechaAlta
              ?.includes(fecha);

          return (
            coincideNombre &&
            coincideEquipo &&
            coincideFecha
          );

        }

      );

  }

  // ==========================================
  // EDITAR JUGADOR
  // ==========================================

  editarJugador(jugador: any): void {

    this.jugadorEditando = {
      ...jugador
    };

  }

  // ==========================================
  // ACTUALIZAR JUGADOR
  // ==========================================

  actualizarJugador(): void {

    this.apiFootballService.actualizarJugador(
      this.jugadorEditando.id,
      this.jugadorEditando
    ).subscribe({

      next: () => {

        this.jugadorEditando = null;

        this.obtenerJugadores();

      },

      error: (error) => {

        console.error(error);

        this.mensajeError =
          'Error al actualizar jugador';

      }

    });

  }

  // ==========================================
  // CANCELAR EDICIÓN
  // ==========================================

  cancelarEdicion(): void {

    this.jugadorEditando = null;

  }

  // ==========================================
  // ELIMINAR JUGADOR
  // ==========================================

  eliminarJugador(id: string): void {
      const confirmacion = confirm('¿Desea eliminar este jugador?');

  if (!confirmacion) {
    return; // ❌ cancela la acción
  }

    this.apiFootballService.eliminarJugador(id)
      .subscribe({

        next: () => {

          this.obtenerJugadores();

        },

        error: (error) => {

          console.error(error);

          this.mensajeError =
          'Error al eliminar jugador';

        }
      });
  }

  // ==========================================
// MOSTRAR / OCULTAR COMENTARIOS
// ==========================================

toggleComentarios(
  jugadorId: string
): void {

  // Si estaba abierto → cerrar
  if (this.mostrarComentarios[jugadorId]) {

    this.mostrarComentarios[jugadorId] = false;

    return;
  }

  // Abrir
  this.mostrarComentarios[jugadorId] = true;

  // Cargar comentarios
  this.cargarComentarios(jugadorId);

}

// ==========================================
// CARGAR COMENTARIOS
// ==========================================

cargarComentarios(
  jugadorId: string
): void {

  this.comentariosService
    .obtenerComentarios(jugadorId)

    .subscribe({

      next: (respuesta: any) => {

        this.comentarios[jugadorId] =
          [...respuesta];

        this.cdRef.detectChanges();

      },

      error: (error) => {

        console.error(error);
      }
    });
}
// ==========================================
// CREAR COMENTARIO
// ==========================================
crearComentario(jugadorId: string): void {

  const texto = this.nuevoComentario[jugadorId];

  if (!texto || texto.trim() === '') {
    return;
  }

  navigator.geolocation.getCurrentPosition(

    (position) => {

      const comentario = {

        jugadorId: jugadorId,

        autor: this.authService.getUsuario(),

        contenido: texto,

        geolocalizacion: {

          latitud: position.coords.latitude,

          longitud: position.coords.longitude
        }
      };

      this.comentariosService
        .crearComentario(comentario)

        .subscribe({

          next: () => {

            this.nuevoComentario[jugadorId] = '';

            this.cargarComentarios(jugadorId);
          },

          error: (error) => {

            console.error(error);

            this.mensajeError =
              'Error al crear comentario';
          }
        });

    },

    (error) => {

      console.error(error);

      this.mensajeError =
        'No se pudo obtener la geolocalización';
    }
  );
}

// ==========================================
// ELIMINAR COMENTARIO
// ==========================================
eliminarComentario(
  comentarioId: string,
  jugadorId: string
): void {

  const confirmar =
    confirm('¿Eliminar comentario?');

  if (!confirmar) {
    return;
  }

  this.comentariosService
    .eliminarComentario(comentarioId)

    .subscribe({

      next: () => {

        this.cargarComentarios(jugadorId);
      },

      error: (error) => {

        console.error(error);

        this.mensajeError =
          'Error al eliminar comentario';
      }
    });
}

}
