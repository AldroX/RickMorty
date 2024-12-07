import { Component, HostListener, inject, signal } from '@angular/core';
import { CharactersService } from '../../core/services/characters.services/characters.service';
import { Character, CharacterResponse } from '../../core/interfaces/characters/characters.interface';
import { map } from 'rxjs';
import { CardComponent } from '../card/card.component';
import { SearchComponent } from '../search/search.component';
import { Info } from '../../core/interfaces/info.interface';
import { LoadSpinerComponent } from '../../core/utils/loadSpiner/loadSpiner.component';
import { ErrorComponent } from '../../core/utils/error/error.component';
import { SkeletonComponent } from '../../core/utils/skeleton/skeleton.component';
import { Filters } from '../../core/interfaces/search/filters.interface';
import { SearchGComponent } from '../../core/utils/search-g/search-g.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CardComponent, 
    LoadSpinerComponent,
    ErrorComponent,
    InfiniteScrollDirective
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export default class HeroComponent {
  species: string[] = [];

  searchTerm: string = ''

  isSearching: boolean = false;

  characters: Character[] = []
  apiError:boolean = false
  errorMessage: string  = ''
  
  characters_SC = inject(CharactersService)
  searchService = inject(SearchService)
  speciesSelected:string = ''
  statusSelected:string = ''
  genderSelected:string = ''
  nameSelected:string = ''

  loading: boolean = false;  // Controla si ya estamos cargando datos
  canLoadMore: boolean = true; // Indica si se pueden cargar más datos
  
  nextUrl:number = 1
  page:number = 1
  info: Info = {
    count: 0,
    pages: 0,
    next: '',
    prev: null
  }

  filters:Filters[] = [
     {
      name :'Estado',
      label:'',
      options: [ 'alive', 'dead', 'unknown']
     },
     {
      name :'Genero',
      label:'',
      options: ['female', 'male', 'genderless', 'unknown']
     },
     {
      name :'Especies',
      label:'',
      options: this.species
     }
  ]
  ngOnInit(): void {
    this.getAllCharacters() ;
    this.getTermSearch()
  }

  getTermSearch(){
    this.searchService.searchTerm$.subscribe({
      next: (term:string) => {
        if(term.trim() === ''){
          this.resetData()
          this.getAllCharacters()
        }else{
          this.resetData()
          this.searchTerm = term;
          this.getAllCharacters()
        }

      }
    })
  }
  
  getAllCharacters() {
    if (!this.canLoadMore) return; // No cargar más si no hay datos disponibles
    this.loading = true

    this.characters_SC.getAllCharacter(
      this.page,
      this.searchTerm,
      this.statusSelected,
      this.speciesSelected,
      this.genderSelected).
    subscribe({
      next: (characters: CharacterResponse) => {
        if(characters.error){
          this.handleErrorResponse(characters.message)
        }else{
          this.handleSuccessResponse(characters)
          this.errorMessage=''
        }},
      error: (error: any) => {
        console.error('Error fetching characters:',error.error);
        this.handleErrorResponse('Ocurrió un error inesperado');
      }
    });
  }

  private handleSuccessResponse(character:CharacterResponse){

    if(character.results && character.results.length > 0){
      this.characters = [...this.characters, ...character.results] 

    }
    if(character.info){
      this.info = character.info; // Actualizar la información de paginación
      this.page++; // Incrementar el número de página
      this.canLoadMore = !!character.info.next; // Verificar si hay más páginas disponibles
    }else{
     // Mostrar mensaje al usuario cuando no hay más datos
      this.errorMessage = 'No hay más información disponible para mostrar.';
      this.canLoadMore = false; // Evitar más solicitudes
    }
  }
  private handleErrorResponse(error:string){
    this.errorMessage = error;
    this.apiError = true
  }
  
  showSpecie(species:string){
     if(species){
      this.resetData()
       this.speciesSelected = species
       console.log('test',this.speciesSelected)
       this.getAllCharacters()
     }  
  }
  showStatus(status:string){
    if(status){
      this.resetData()
      this.statusSelected = status
      console.log('estado', this.statusSelected)
      this.getAllCharacters()
    }
  }
  showGender(gender:string){
     if(gender){
      this.resetData()
      this.genderSelected = gender
      console.log('genero', this.genderSelected)
      this.getAllCharacters()
     }
  }

  showName(name:string){
    try {
      if(name){
        this.isSearching = true
        this.nameSelected = name
        this.resetData()
        this.getAllCharacters()
      }else{
          this.isSearching = false
        }
    } catch (error) {
      console.log(error)
      this.errorMessage =''
    }
  }

  nextPage(){
    if(this.info.next){
      this.page ++;
      this.getAllCharacters()
    }
  }

  prevPage(){
    if(this.info.prev){
      this.page --;
      this.getAllCharacters()
    }else
    {
      console.log('crear una alerta')
    }
  }

  getALLSpecies(){
    this.characters_SC.getAllSpecie().subscribe({
     next: (data:string[]) =>{
       this.species = Array.from(new Set(data))
     },
     error: (e)=>{
       console.error(e)
     }
    })
 }

private resetData(): void {
  this.characters = []; // Limpia la lista de personajes
  this.page = 1;        // Reinicia la paginación
  this.canLoadMore = true; // Permite cargar más datos
  this.info = {         // Reinicia la información de paginación
    count: 0,
    pages: 0,
    next: '',
    prev: null
  };
}
onScroll() {
  if (this.loading && this.canLoadMore) {
    this.getAllCharacters();
  }
}

}
