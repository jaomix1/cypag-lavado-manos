import { Routes } from '@angular/router';
import { TestComponent } from './modules/lavado/test/test.component';
import { LavadoRoutes } from './modules/lavado/lavado.routing';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
    },
    {
        path: 'test',
        component: TestComponent
    },

    ...LavadoRoutes,
];
