import { Injectable } from '@angular/core';

import { BackendService } from './backend';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiFootballService {

  constructor(

    private http: HttpClient,

    private backendService: BackendService

  ) {}

  // ==========================================
  // OBTENER URL BASE
  // ==========================================

  private getBaseUrl(): string {

    return this.backendService
      .getBaseUrl();

  }

  // ==========================================
  // BUSCAR EN API EXTERNA
  // ==========================================

  buscarJugador(
    nombre: string,
    temporada: number,
    liga: number
  ) {

    let params = new HttpParams()

      .set('nombre', nombre)

      .set(
        'temporada',
        temporada
      )

      .set(
        'liga',
        liga
      );

    return this.http.get<any>(

      `${this.getBaseUrl()}/external/buscar`,

      { params }

    );

  }

  // ==========================================
  // IMPORTAR JUGADOR
  // ==========================================

  importarJugador() {

    return this.http.get<any>(

      `${this.getBaseUrl()}/external/importar`

    );

  }

  // ==========================================
  // OBTENER JUGADORES
  // ==========================================

  obtenerJugadores() {

    return this.http.get<any>(

      `${this.getBaseUrl()}/jugadores`

    );

  }

  // ==========================================
  // CREAR JUGADOR
  // ==========================================

  crearJugador(jugador: any) {

    return this.http.post<any>(

      `${this.getBaseUrl()}/jugadores`,

      jugador

    );

  }

  // ==========================================
  // ACTUALIZAR JUGADOR
  // ==========================================

  actualizarJugador(
    id: string,
    jugador: any
  ) {

    return this.http.put<any>(

      `${this.getBaseUrl()}/jugadores/${id}`,

      jugador

    );

  }

  // ==========================================
  // ELIMINAR JUGADOR
  // ==========================================

  eliminarJugador(id: string) {

    return this.http.delete<any>(

      `${this.getBaseUrl()}/jugadores/${id}`

    );

  }

}