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

  // =====================================
  // BACKEND TRWM (Node.js)
  // =====================================

  if (
    this.backendService.obtenerBackend()
      === 'TRWM'
  ) {

    let params = new HttpParams()

      .set(
        'season',
        temporada
      )

      .set(
        'league',
        liga
      );

    return this.http.get<any>(

      `${this.getBaseUrl()}/api/jugadores/external/search/${nombre}`,

      { params }

    );
  }

  // =====================================
  // BACKEND DWSC (Spring Boot)
  // =====================================

  let params = new HttpParams()

    .set(
      'nombre',
      nombre
    )

    .set(
      'season',
      temporada
    )

    .set(
      'liga',
      liga
    );

  return this.http.get<any>(

    `${this.getBaseUrl()}/api/jugadores/buscar-api`,

    { params }

  );

}

  // ==========================================
  // IMPORTAR JUGADOR
  // ==========================================

importarJugador(
  playerId: number,
  temporada: number
) {

  let params = new HttpParams()

    .set(
      'season',
      temporada
    );

  return this.http.post<any>(

    `${this.getBaseUrl()}/api/jugadores/import/${playerId}`,

    {},

    { params }

  );

}

  // ==========================================
  // OBTENER JUGADORES
  // ==========================================

obtenerJugadores() {

  return this.http.get<any>(

    this.getPlayersEndpoint()

  );

}

  // ==========================================
  // CREAR JUGADOR
  // ==========================================

crearJugador(jugador: any) {

  return this.http.post<any>(

    this.getPlayersEndpoint(),

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

    `${this.getPlayersEndpoint()}/${id}`,

    jugador

  );

}

  // ==========================================
  // ELIMINAR JUGADOR
  // ==========================================

eliminarJugador(id: string) {

  return this.http.delete<any>(

    `${this.getPlayersEndpoint()}/${id}`

  );

}
  // ==========================================
  // CAMBIO RUTAS SEGUN BACKEND
  // ==========================================
private getPlayersEndpoint(): string {

  return `${this.getBaseUrl()}/api/jugadores`;

}
}