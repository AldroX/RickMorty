import { Component, inject, signal } from '@angular/core';
import { CharactersService } from '../../core/services/characters.services/characters.service';
import { Character, CharacterResponse } from '../../core/interfaces/characters/characters.interface';
import { map } from 'rxjs';
import { CardComponent } from '../card/card.component';
import { SearchComponent } from '../search/search.component';
import { Info } from '../../core/interfaces/info.interface';
import { LoadSpinerComponent } from '../../core/utils/loadSpiner/loadSpiner.component';
import { ErrorComponent } from '../../core/utils/error/error.component';
import { SkeletonComponent } from '../../core/utils/skeleton/skeleton.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CardComponent, 
    SearchComponent,
    LoadSpinerComponent,
    ErrorComponent,
    SkeletonComponent
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export default class HeroComponent {


  ngOnChanges(): void {
    this.getAllCharacters()  
  }

  characters: Character[] = []
  apiError:boolean = false
  errorMessage: string  = ''
  
  characters_SC = inject(CharactersService)
  speciesSelected:string = ''
  statusSelected:string = ''
  genderSelected:string = ''
  nameSelected:string = ''

  page:number = 1
  info: Info = {
    count: 0,
    pages: 0,
    next: '',
    prev: null
  }

  ngOnInit(): void {
    this.getAllCharacters()  
  }
  
  getAllCharacters() {
    this.characters_SC.getAllCharacter(
      this.page,
      this.nameSelected,
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
    this.characters = character.results;
    if(character.info !==null){
      this.info = character.info
    }else{
      console.log('no se encotro info') //mejorar esto 
    }
  }
  private handleErrorResponse(error:string){
    this.errorMessage = error;
    this.apiError = true
  }
  
  showSpecie(species:string){
     if(species){
       this.speciesSelected = species
       console.log('test',this.speciesSelected)
       this.getAllCharacters()
     }  
  }
  showStatus(status:string){
    if(status){
      this.statusSelected = status
      console.log('estado', this.statusSelected)
      this.getAllCharacters()
    }
  }
  showGender(gender:string){
     if(gender){
      this.genderSelected = gender
      console.log('genero', this.genderSelected)
      this.getAllCharacters()
     }
  }

  showName(name:string){
    try {
      if(name) this.nameSelected = name
      this.getAllCharacters()
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

}
