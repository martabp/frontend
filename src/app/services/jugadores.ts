import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackendService } from './backend';

@Injectable({
  providedIn: 'root'
})

export class JugadoresService {

  constructor(

    private http: HttpClient,
    private backendService: BackendService

  ) {}

  /*
   * URL dinámica backend
   */
  private get apiUrl(): string {

    return `${this.backendService
      .getBaseUrl()}/api/jugadores`;

  }

  /*
   * Obtener jugadores
   */
  obtenerJugadores():
  Observable<any> {
    console.log(this.apiUrl);
    return this.http.get<any>(
      this.apiUrl
    );

  }

  /*
   * Crear jugador
   */
  crearJugador(
    jugador: any
  ): Observable<any> {

    return this.http.post<any>(

      this.apiUrl,

      jugador,

      {
        responseType:
          'text' as 'json'
      }
    );
  }
}