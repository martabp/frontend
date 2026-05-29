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
import { BuscarJugador } from '../buscar-jugador/buscar-jugador';
import { BackendService } from '../../services/backend';

@Component({
  selector: 'app-jugadores',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    BuscarJugador
  ],

  templateUrl: './jugadores.html',
  styleUrls: ['./jugadores.css']
})

export class JugadoresComponent
implements OnInit {

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
  // NUEVO JUGADOR
  // ==========================================

  nuevoJugador = {
    nombre: '',
    equipo: '',
    liga: '',
    posicion: '',
    edad: null,
    imagen: ''
  };

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
  valoracionComentario: any = {};
  mostrarComentarios: any = {};

  // ==========================================
  // VISIBILIDAD CARDS
  // ==========================================

  mostrarGestion = false;
  mostrarFormularioJugador = false;
  mostrarListaJugadores = false;
  mostrarImportarApi = false;

  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  constructor(

    private apiFootballService: ApiFootballService,
    private comentariosService: ComentariosService,
    public authService: AuthService,
    public backendService: BackendService,
    private cdRef: ChangeDetectorRef

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

    this.apiFootballService
      .obtenerJugadores()
      .subscribe({
        next: (respuesta: any) => {
          this.jugadores = [...respuesta.data];
          this.jugadoresOriginales = [...respuesta.data];
          this.jugadores.forEach((jugador: any) => {
            const id =
              jugador._id || jugador.id;
            this.cargarComentarios(id);

          });
          this.mensajeError = '';
          this.cdRef.detectChanges();
        },
        error: (error) => {
          console.error(error);
          this.mensajeError = 'Error al obtener jugadores';
        }
      });
  }

  // ==========================================
  // FILTRAR JUGADORES
  // ==========================================

  filtrarJugadores(): void {

    this.mensajeExito = '';
    this.mensajeError = '';

    const nombre = this.busquedaNombre.toLowerCase();
    const equipo = this.busquedaEquipo.toLowerCase();
    const fecha = this.busquedaFecha;

    this.jugadores =
      this.jugadoresOriginales.filter(
        jugador => {

          const coincideNombre = jugador.nombre
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
  // AGREGAR JUGADOR
  // ==========================================

  agregarJugador(): void {

    this.mensajeExito = '';
    this.mensajeError = '';

    if (!this.nuevoJugador.nombre) {
      this.mensajeError = 'El nombre del jugador es obligatorio';
      return;
    }

    this.apiFootballService
      .crearJugador(this.nuevoJugador)
      .subscribe({
        next: () => {

          this.mensajeExito =  'Jugador insertado correctamente';
          this.mensajeError = '';
          this.nuevoJugador = {
            nombre: '',
            equipo: '',
            liga: '',
            posicion: '',
            edad: null,
            imagen: ''

          };

          this.obtenerJugadores();

          setTimeout(() => {
            this.mensajeExito = '';
          }, 3000);

        },

        error: (error) => {

          console.error(error);

          if (error.status === 400) {
            this.mensajeError = 'Datos inválidos o incompletos';
          } else if (error.status === 401) {
            this.mensajeError = 'Debe iniciar sesión';
          } else if (error.status === 403) {
            this.mensajeError = 'No tiene permisos';
          } else if (error.status === 0) {
            this.mensajeError = 'No se puede conectar con el servidor';
          } else {
            this.mensajeError = 'Error al insertar jugador';
          }
        }
      });
  }

  // ==========================================
  // EDITAR JUGADOR
  // ==========================================

  editarJugador(jugador: any): void {

    this.mensajeExito = '';
    this.mensajeError = '';
    this.jugadorEditando = {
      ...jugador
    };

  }

  // ==========================================
  // ACTUALIZAR JUGADOR
  // ==========================================

  actualizarJugador(): void {

    console.log(this.jugadorEditando);

    this.mensajeExito = '';
    this.mensajeError = '';
    this.apiFootballService
      .actualizarJugador(
        this.jugadorEditando.id || this.jugadorEditando._id,
        this.jugadorEditando
      )

      .subscribe({

        next: () => {

          this.jugadorEditando = null;
          this.mensajeExito = 'Jugador actualizado correctamente';
          this.mensajeError = '';
          this.obtenerJugadores();
          setTimeout(() => {
            this.mensajeExito = '';
          }, 3000);

        },

        error: (error) => {

          console.error(error);
          this.mensajeExito = '';
          if (error.status === 400) {

            this.mensajeError =
              error.error?.mensaje || error.error?.message ||  'Faltan campos obligatorios';
          }

          else if (error.status === 401) {
            this.mensajeError =  'No estás autenticado';
          }

          else if (error.status === 403) {
            this.mensajeError = 'No tienes permisos';
          }

          else {
            this.mensajeError = 'Error al actualizar jugador';
          }
        }
      });
  }

  // ==========================================
  // CANCELAR EDICIÓN
  // ==========================================

  cancelarEdicion(): void {

    this.jugadorEditando = null;
    this.mensajeExito = '';
    this.mensajeError = '';
  }

  // ==========================================
  // ELIMINAR JUGADOR
  // ==========================================

  eliminarJugador(id: string): void {

    const confirmacion =
      confirm(
        '¿Desea eliminar este jugador?'
      );

    if (!confirmacion) {
      return;
    }

    this.apiFootballService
      .eliminarJugador(id)
      .subscribe({
        next: () => {

          this.mensajeExito =  'Jugador eliminado correctamente';
          this.mensajeError = '';
          this.obtenerJugadores();

          setTimeout(() => {

            this.mensajeExito = '';

          }, 3000);

        },

        error: (error) => {
          console.error(error);
          this.mensajeError = 'Error al eliminar jugador';
        }
      });
  }

  // ==========================================
  // MOSTRAR / OCULTAR COMENTARIOS
  // ==========================================

  toggleComentarios(
    jugadorId: string
  ): void {

    if (
      this.mostrarComentarios[jugadorId]
    ) {

      this.mostrarComentarios[
        jugadorId
      ] = false;

      this.mensajeExito = '';
      this.mensajeError = '';
      return;

    }

    this.mostrarComentarios[
      jugadorId
    ] = true;

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

        this.comentarios[
          jugadorId
        ] = [...respuesta];

        this.cdRef.detectChanges();

      },

      error: (error) => {

        console.error(error);

      }

    });

}
// ==========================================
// OBTENER MEDIA VALORACIONES
// ==========================================

obtenerMediaValoraciones(
  jugadorId: string
): string {

  const listaComentarios =
    this.comentarios[jugadorId];

  if (
    !listaComentarios ||
    listaComentarios.length === 0
  ) {

    return '0.0';

  }

  const comentariosConValoracion =

    listaComentarios.filter(
      (c: any) =>
        c.valoracion != null
    );

  if (
    comentariosConValoracion.length === 0
  ) {

    return '0.0';

  }

  const suma =

    comentariosConValoracion.reduce(

      (
        total: number,
        comentario: any
      ) =>

        total +
        Number(
          comentario.valoracion
        ),

      0

    );

  return (

    suma /
    comentariosConValoracion.length

  ).toFixed(1);

}

// ==========================================
// CREAR COMENTARIO
// ==========================================

crearComentario(
  jugadorId: string
): void {

  const texto =
    this.nuevoComentario[jugadorId];

  if (
    !texto ||
    texto.trim() === ''
  ) {

    return;

  }

  navigator.geolocation
    .getCurrentPosition(
      (position) => {
        const comentario = {
          jugadorId: jugadorId,
          autor: this.authService.getUsuario(),
          contenido: texto,
          valoracion:
            this.valoracionComentario[
              jugadorId
            ],

          geolocalizacion: {
            latitud: position.coords.latitude,
            longitud: position.coords.longitude
          }
        };

        this.comentariosService
          .crearComentario(comentario)
          .subscribe({
            next: () => {

              this.mensajeExito = 'Comentario añadido correctamente';
              this.mensajeError = '';
              this.nuevoComentario[ jugadorId ] = '';
              this.cargarComentarios( jugadorId);

              setTimeout(() => {
                this.mensajeExito = '';
              }, 3000);

            },

            error: (error) => {
              console.error(error);
              this.mensajeError =  'Error al crear comentario';
            }
          });
      },

      (error) => {

        console.error(error);
        this.mensajeError = 'No se pudo obtener la geolocalización';
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

  const confirmar =  confirm( '¿Eliminar comentario?');
  if (!confirmar) {
    return;
  }

  this.comentariosService
    .eliminarComentario(comentarioId)
    .subscribe({
      next: () => {

        this.mensajeExito =  'Comentario eliminado correctamente';
        this.mensajeError = '';
        this.cargarComentarios(jugadorId);

        setTimeout(() => {
          this.mensajeExito = '';
        }, 3000);
      },

      error: (error) => {

        console.error(error);
        this.mensajeError = 'Error al eliminar comentario';
      }
    });
}
}