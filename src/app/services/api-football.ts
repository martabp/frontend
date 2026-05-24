import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiFootballService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // =========================
  // BUSCAR + GUARDAR
  // =========================
  buscarJugador(nombre: string, temporada: number, liga: number) {

    let params = new HttpParams()
      .set('nombre', nombre)
      .set('temporada', temporada)
      .set('liga', liga);

    return this.http.get<any>(
      `${this.baseUrl}/external/buscar`,
      { params }
    );
  }

  // =========================
  // IMPORTAR
  // =========================
  importarJugador() {
    return this.http.get<any>(
      `${this.baseUrl}/external/importar`
    );
  }

  // =========================
  // CRUD 
  // =========================
  obtenerJugadores() {
    return this.http.get<any>(`${this.baseUrl}/jugadores`);
  }

  actualizarJugador(id: string, jugador: any) {
    return this.http.put<any>(`${this.baseUrl}/jugadores/${id}`, jugador);
  }

  eliminarJugador(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/jugadores/${id}`);
  }
}