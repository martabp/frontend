import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';

import { BackendService } from './backend';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

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
        .getBaseUrl()}/api/auth`;

    }

    // ============================
    // BACKEND DWSC
    // ============================

    return `${this.backendService
      .getBaseUrl()}/auth`;

  }

  // ============================
  // LOGIN
  // ============================

  login(
    email: string,
    password: string
  ): Observable<any> {

    return this.http.post<any>(

      `${this.apiUrl}/login`,

      {
        email,
        password
      }

    ).pipe(

      tap((response: any) => {

      

        // =====================================
        // GUARDAR TOKEN
        // =====================================

        localStorage.setItem(

          'token',

          response.token

        );

        // =====================================
        // GUARDAR USUARIO
        // =====================================

        localStorage.setItem(

          'usuario',

          response.usuario.nombre


        );

      })

    );

  }

  // ============================
  // LOGOUT
  // ============================

  logout(): void {

    localStorage.removeItem(
      'token'
    );

    localStorage.removeItem(
      'usuario'
    );

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
  // OBTENER ROL DESDE JWT
  // ============================

  getRol(): string | null {

    const token = this.getToken();

    if (!token) {

      return null;

    }

    try {

      const payload = JSON.parse(

        atob(token.split('.')[1])

      );

      console.log(
        'PAYLOAD JWT:',
        payload
      );

      return payload.rol;

    } catch (error) {

      console.error(
        'Error al leer JWT',
        error
      );

      return null;

    }

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

  // ============================
  // REGISTRO
  // ============================

registrar(
  usuario: any
): Observable<any> {

  return this.http.post<any>(

    `${this.apiUrl}/register`,

    usuario

  );

}

}