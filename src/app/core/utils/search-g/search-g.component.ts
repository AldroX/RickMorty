import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filters } from '../../interfaces/search/filters.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Observable } from 'rxjs';
import { Character } from '../../interfaces/characters/characters.interface';

@Component({
  selector: 'app-search-g',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-g.component.html',
  styleUrl: './search-g.component.css'
})
export class SearchGComponent {
  
  @Input() label:string = ''
  @Input() filters:Filters[] = []
  @Output() filterChanges = new EventEmitter<{[key:string]:string[]}>
  
  searchForm= new FormGroup({
    search: new FormControl('')
  })
  nameCharacter$ = Observable<string>
  
  ngOnInit(): void {
    this.onSubmit()
    
  }
  
  onSubmit() {
  try {
      if(this.searchForm.valid){
       this.searchForm.valueChanges.pipe(debounceTime(1000)).subscribe({
         next:(data:any)=>  {
           const dataSearch = data.value
           this.filterChanges.emit(dataSearch)
         }
       })
      }
    
  } catch (error) {
    console.log('error encontrado en =>',error)
  }
  }



 

}
