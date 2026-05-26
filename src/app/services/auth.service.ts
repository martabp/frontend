import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL backend
  private apiUrl =
    'http://localhost:8080/auth';

  constructor(
    private http: HttpClient
  ) {}

  // ============================
  // LOGIN
  // ============================

  login(username: string): Observable<any> {

    const params =
      new HttpParams()
        .set('username', username);

    return this.http.post(
      `${this.apiUrl}/login`,
      {},
      { params }

    ).pipe(

      tap((response: any) => {

        // Guardar token
        localStorage.setItem(
          'token',
          response.token
        );

        // Guardar rol
        localStorage.setItem(
          'rol',
          response.rol
        );

        // Guardar usuario
        localStorage.setItem(
          'usuario',
          username
        );
      })
    );
  }

  // ============================
  // LOGOUT
  // ============================

  logout(): void {

    localStorage.removeItem('token');

    localStorage.removeItem('rol');

    localStorage.removeItem('usuario');
  }

  // ============================
  // OBTENER TOKEN
  // ============================

  getToken(): string | null {

    return localStorage.getItem(
      'token'
    );
  }

  // ============================
  // OBTENER ROL
  // ============================

  getRol(): string | null {

    return localStorage.getItem(
      'rol'
    );
  }

  // ============================
  // OBTENER USUARIO
  // ============================

  getUsuario(): string | null {

    return localStorage.getItem(
      'usuario'
    );
  }

  // ============================
  // COMPROBAR LOGIN
  // ============================

  estaLogueado(): boolean {

    return !!this.getToken();
  }

  // ============================
  // COMPROBAR ADMIN
  // ============================

  esAdmin(): boolean {

    return this.getRol() === 'ADMIN';
  }

  registrar(usuario: any) {
  // ============================
  // REGISTRO USUARIO
  // ============================
  return this.http.post(
    'http://localhost:8080/auth/register',
    usuario
  );

}
}