import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class JugadoresService {

  private apiUrl =
    'http://localhost:8080/api/jugadores';

  constructor(
    private http: HttpClient
  ) {}

  obtenerJugadores(): Observable<any> {

    return this.http.get<any>(
      this.apiUrl
    );

  }

 crearJugador(jugador: any): Observable<any> {

  return this.http.post<any>(

    this.apiUrl,

    jugador,

    {
      responseType: 'text' as 'json'
    }

  );

}

}