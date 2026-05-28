import { Injectable } from '@angular/core';

import { BackendService }
from './backend';

import {

  HttpClient,
  HttpParams

} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ComentariosService {

  constructor(

    private http: HttpClient,

    private backendService:
      BackendService

  ) {}

  /*
   * URL dinámica backend
   */
private get apiUrl(): string {

  // ============================
  // BACKEND TRWM
  // ============================

  if (
    this.backendService.obtenerBackend()
      === 'TRWM'
  ) {

    return `${this.backendService
      .getBaseUrl()}/api/comentarios`;

  }

  // ============================
  // BACKEND DWSC
  // ============================

  return `${this.backendService
    .getBaseUrl()}/api/comentarios`;

}

  // =====================================
  // OBTENER COMENTARIOS
  // =====================================

  obtenerComentarios(
    jugadorId: string
  ) {

    const params =
      new HttpParams()
        .set('jugadorId', jugadorId);

    return this.http.get<any[]>(

      `${this.apiUrl}/jugador`,

      { params }

    );

  }

  // =====================================
  // CREAR COMENTARIO
  // =====================================

  crearComentario(
    comentario: any
  ) {

    return this.http.post(

      this.apiUrl,

      comentario

    );

  }

  // =====================================
  // ELIMINAR COMENTARIO
  // =====================================

  eliminarComentario(
    id: string
  ) {

    return this.http.delete(

      `${this.apiUrl}/${id}`

    );

  }

}