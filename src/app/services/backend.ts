import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BackendService {

  private backendKey =
    'backendSeleccionado';

  seleccionarBackend(
    backend: 'DWSC' | 'TRWM'
  ): void {

    localStorage.setItem(
      this.backendKey,
      backend
    );

  }

  obtenerBackend():
  'DWSC' | 'TRWM' {

    const backend =
      localStorage.getItem(
        this.backendKey
      );

    if (backend === 'TRWM') {

      return 'TRWM';

    }

    return 'DWSC';

  }

  /*
   * URL BASE
   * SIN /api
   */
  getBaseUrl(): string {

    if (
      this.obtenerBackend() ===
      'TRWM'
    ) {

      return 'http://localhost:3000';

    }

    return 'http://localhost:8080';

  }

}