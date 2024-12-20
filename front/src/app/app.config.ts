import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptorFunctional } from './commons/util/interceptor';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideAnimations(),
  provideHttpClient(
    withInterceptors([
      authInterceptorFunctional
    ]),
  ),
    MatDatepickerModule,
    MatNativeDateModule,
  { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
};
