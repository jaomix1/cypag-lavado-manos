import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';


export const LavadoRoutes: Routes = [
    {
        path: 'main',
        component: MainComponent,
        // children: [
        //     { path: '', component: ListLavadoDeManosComponent },
        //     { path: 'listLavadoDeMano', component: ListLavadoDeManosComponent },
        //     { path: 'detallecup/:id', component: DetailLavadoDeManoComponent }

        // ]
    }
];
