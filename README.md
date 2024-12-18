ng version: 
@angular-devkit/architect    0.1702.1 (cli-only)
@angular-devkit/core         17.2.1 (cli-only)
@angular-devkit/schematics   17.2.1 (cli-only)
@schematics/angular          17.2.1 (cli-only)

Node --v:
v20.9.0

ng new mfe2

cd mfe2

npm i @angular-architects/native-federation@17.0.0

ng add @angular-architects/native-federation --project mfe2 --port 47083 --type remote

ng g c modules\lavado\main 


ng g c modules\lavado\test


agregar archivo  
modules\lavado\lavado.routing.ts
```ts
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
```

modificar el 
app.routes.ts

```ts
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
```

limpiar **app.component.html** solo dejar:
```html
<router-outlet />
```

agregar routas al archivo **federation.config.js**
```ts
  exposes: {
    './Component': './src/app/app.component.ts',
    './routes': './src/app/app.routes.ts',
  },
```