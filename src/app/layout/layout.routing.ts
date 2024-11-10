import { Routes,  } from "@angular/router";


export const LAYOUT_ROUTES:Routes = [
    {
        path:'',
        loadComponent: () => import('./home/home.component')
    }

]

export default LAYOUT_ROUTES