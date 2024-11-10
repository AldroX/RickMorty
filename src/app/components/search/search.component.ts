import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CharactersService } from '../../core/services/characters.services/characters.service';
import { Character } from '../../core/interfaces/characters/characters.interface';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent{

constructor(){
  this.onSubmit()
}  

onSubmit() {
  this.search.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe({
    next: data => {
      try {
        if(data) this.nameEmitted.emit(data)
        
      } catch (error) {
        console.log(error)
        
      }
    },
    
  })
}

  search= new FormControl('')

   characters_SV = inject(CharactersService)
   species: string[] = []
   characterData:Character[] =[]
   status:string[] = [
    'alive',
    'dead',
    'unknown'
  ]

  gender:string[] = [
    'female',
    'male',
    'genderless',
    'unknown'
  ]
  // gender: filter by the given gender (female, male, genderless or unknown).

  //  speciesEmited = output<string>()
   @Output() speciesEmited = new EventEmitter<string>();
   @Output() statusEmitted = new EventEmitter<string>();
   @Output() genderEmitted = new EventEmitter<string>();
   @Output() nameEmitted = new EventEmitter<string>();
   
   ngOnInit(): void {
     this.getALLSpecies()
   }

   //Sitema de filtros para las especie
   getALLSpecies(){
     this.characters_SV.getAllSpecie().subscribe({
      next: (data:string[]) =>{
        this.species = Array.from(new Set(data))
      },
      error: (e)=>{
        console.error(e)
      }
     })
  }

  selectedEspecie(event:Event){
    const target = event.target as HTMLSelectElement | null;
    if(target){
      const selectedSpecie = target.value;
      this.speciesEmited.emit(selectedSpecie)
      console.log('la especie seleccionado es =>',selectedSpecie)
    }
  }

  selectStatus(event:Event){
    const target = event.target as HTMLSelectElement | null;
    if(target){
      const selectedValue = target.value;
      this.statusEmitted.emit(selectedValue)
      console.log('el estado seleccionado es =>',selectedValue)
    }
  }

  selectGender(event:Event){
    const target = event.target as HTMLSelectElement | null;
    if(target){
      const selectedGender = target.value;
      this.genderEmitted.emit(selectedGender)
      console.log('El genero seleccionado es =>',selectedGender)
    }
  }

  // onSubmit() {
  //   try {
  //       if(this.searchForm){
  //        this.searchForm.valueChanges.pipe(debounceTime(1000)).subscribe({
  //          next:(data:any)=>  {
  //            console.log('busnado a:',data)
            
  //          }
  //        })
  //       }
      
  //   } catch (error) {
  //     console.log('error encontrado en =>',error)
  //   }
  //   }
  
}


