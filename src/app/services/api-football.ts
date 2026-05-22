import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiFootballService {

  // =====================================================
  // URL BACKEND SPRING
  // =====================================================

  private apiUrl =
    'http://localhost:8080/api/jugadores';

  // =====================================================
  // URL API FOOTBALL
  // =====================================================

  private apiFootballUrl =
    'http://localhost:8080/api/football';

  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private http: HttpClient
  ) { }

  // =====================================================
  // OBTENER TODOS LOS JUGADORES
  // =====================================================

  obtenerJugadores(): Observable<any[]> {

    return this.http.get<any[]>(
      this.apiUrl
    );

  }

  // =====================================================
  // CREAR JUGADOR
  // =====================================================

  crearJugador(
    jugador: any
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      jugador
    );

  }

  // =====================================================
  // ACTUALIZAR JUGADOR
  // =====================================================

  actualizarJugador(
    id: string,
    jugador: any
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      jugador
    );

  }

  // =====================================================
  // ELIMINAR JUGADOR
  // =====================================================

  eliminarJugador(
    id: string
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

  // =====================================================
  // BUSCAR JUGADOR EN API-FOOTBALL
  // =====================================================

  buscarJugador(
    nombre: string,
    equipo: string
  ): Observable<any> {

    return this.http.get(
      `${this.apiFootballUrl}/buscar`,
      {
        params: {
          nombre,
          equipo
        }
      }
    );

  }

  // =====================================================
  // IMPORTAR JUGADOR
  // =====================================================

  importarJugador(
    jugador: any
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/importar`,
      jugador
    );

  }

}