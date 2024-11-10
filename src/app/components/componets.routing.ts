import { Routes } from "@angular/router";

export const COMPONETS_ROUTES:Routes = [
   {
     path:'',
     loadComponent: () => import('./hero/hero.component')
   },
   {
    path:'hola:id',
    loadComponent: () => import('./showCharacter/showCharacter.component')
   },

] 

export default COMPONETS_ROUTES