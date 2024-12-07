import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadChildren: () => import('./components/componets.routing')
    },
    // {
    //     path:'',
    //     loadChildren: () => import('./layout/layout.routing')
    // },
   
];
