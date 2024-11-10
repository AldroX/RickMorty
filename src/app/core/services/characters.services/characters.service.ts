import { inject, Injectable } from '@angular/core';
import { catchError, concatAll, count, map, Observable, of, switchMap, throwError } from 'rxjs';
import { Character, CharacterResponse } from '../../interfaces/characters/characters.interface';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  
  http = inject(HttpClient)

  apiURL = 'https://rickandmortyapi.com/api/'

  getAllCharacter(
    page:number = 1,
    name?:string, 
    status?:string ,
    species?:string, 
    gender?:string ):Observable<CharacterResponse>{

      let params = new HttpParams().set('page',page.toString());
      if(name)   params = params.append('name',name);
      if(status) params = params.append('status',status);
      if(species)params = params.append('species',species);
      if(gender) params = params.append('gender', gender);

      return this.http.get<any>(`${this.apiURL}/character`, {params}).pipe(
       
        map(response =>{
            if(!response || !response.results || response.results.length ===0){
              return {info:null, results: [], count:0};
            }
             return response
          }),
          catchError(
             this.showError.bind(this)
          ))
  }

  private showError(error:any):Observable<CharacterResponse>{
     const errorMessage = error.status === 404 ?
     'No se econtraron personajes':
     'Ocurrio un error inesperado';
     return of({
        info: null,
        results: [],
        count: 0,
        error: true,
        message: errorMessage
     })
  }

  getById(id:Character['id']):Observable<Character>{
    return this.http.get<Character>(`${this.apiURL}character/${id}`)
  }

  // ----------------------------------FILTERS--------------------------------------------------

  get(sex:Character['gender']):Observable<Character>{
    return this.http.get<Character>(`${this.apiURL}character/${sex}`)
  }

  getAllSpecie():Observable<string[]>{
    return this.http.get<any>(`${this.apiURL}character/`).pipe(
      map((response) => response.results.map((character:Character)=> character.species))
    )
  }
}
