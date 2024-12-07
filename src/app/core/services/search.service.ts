import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

   http = inject(HttpClient)
   // Crea un BehaviorSubject para gestionar y emitir cambios en el término de búsqueda.
   // BehaviorSubject permite almacenar un valor inicial ('') y emitir nuevos valores a los suscriptores.
   private searchTerm = new BehaviorSubject<string>('');
   searchTerm$: Observable<string> = this.searchTerm.asObservable();
  
   constructor() { }
   /**
    * Public method to update the search term
    * @param term - The new search term as a string
   */
   setSearchTerm(term:string){
      // Update the BehaviorSubject with the new term
      this.searchTerm.next(term)
      console.log('estoy desde el servicio: ',term)
   }


}
