import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private apiUrl =
    'http://localhost:3000/api/comentarios';

  constructor(
    private http: HttpClient
  ) {}

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

  eliminarComentario(id: string) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}