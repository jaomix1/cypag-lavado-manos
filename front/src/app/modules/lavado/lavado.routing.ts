import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';


export const LavadoRoutes: Routes = [
    {
        path: 'main',
        component: MainComponent,
        // children: [
        //     { path: '', component: ListCupsComponent },
        //     { path: 'listCup', component: ListCupsComponent },
        //     { path: 'detallecup/:id', component: DetailCupComponent }

        // ]
    }
];
