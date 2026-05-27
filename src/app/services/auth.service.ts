import { Injectable } from '@angular/core';

import {

  HttpClient

} from '@angular/common/http';

import {

  Observable,
  tap

} from 'rxjs';

import { BackendService }
from './backend';

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

          email

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
      'rol'
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

  // ============================
  // REGISTRO
  // ============================

  registrar(
    usuario: any
  ) {

    return this.http.post(

      `${this.apiUrl}/register`,

      usuario,

      {
        responseType: 'text'
      }

    );

  }

}