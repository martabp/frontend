import {
  HttpInterceptorFn
} from '@angular/common/http';

import { inject } from '@angular/core';

import { BackendService }
from '../services/backend';

export const jwtInterceptor:
HttpInterceptorFn = (

  req,
  next

) => {

  const backendService =
    inject(BackendService);

  const token =
    localStorage.getItem(

      `token_${backendService
        .obtenerBackend()}`

    );

  if (token) {

    const cloned =
      req.clone({

        setHeaders: {

          Authorization:
            `Bearer ${token}`

        }

      });

    return next(cloned);

  }

  return next(req);

};