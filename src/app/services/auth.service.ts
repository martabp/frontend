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
    private backendService:BackendService

  ) {}

  /*
   * URL dinámica backend
   */
  private get apiUrl(): string {

    // ============================
    // BACKEND TRWM
    // ============================

    if (
      this.backendService.obtenerBackend() === 'TRWM'
    ) {
      return `${this.backendService.getBaseUrl()}/api/auth`;
    }

    // ============================
    // BACKEND DWSC
    // ============================

    return `${this.backendService.getBaseUrl()}/auth`;

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

            `token_${this.backendService.obtenerBackend()}`,

          response.token

        );

        // =====================================
        // GUARDAR USUARIO
        // =====================================

      localStorage.setItem('usuario', response.usuario?.nombre || response.usuario?.email || response.nombre ||response.email || 'Usuario');

      })

    );

  }

  // ============================
  // LOGOUT
  // ============================

  logout(): void {

     localStorage.removeItem(`token_${this.backendService.obtenerBackend()}`
  );

    localStorage.removeItem( 'usuario');

  }

  // ============================
  // OBTENER TOKEN
  // ============================

  getToken(): string | null {

    return localStorage.getItem( `token_${this.backendService.obtenerBackend()}`

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

     //console.log('PAYLOAD JWT:',payload);

      return payload.rol || payload.role ||  payload.authorities?.[0] || null;

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

 // esAdmin(): boolean {

    //return this.estaLogueado() && this.getRol() === 'ADMIN' ;

  //}
  esAdmin(): boolean {

  const rol = this.getRol();

  return [

    'ADMIN',
    'admin',
    'ROLE_ADMIN'

  ].includes(rol || '');

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