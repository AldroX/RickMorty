import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filters } from '../../interfaces/search/filters.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { Character } from '../../interfaces/characters/characters.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-g',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './search-g.component.html',
  styleUrl: './search-g.component.css'
})
export class SearchGComponent {
  
  @Input() label:string = ''
  @Input() filter:Filters[] = [] 
  @Output() filterChanges = new EventEmitter<{[key:string]:string[]}>
  @Output() searchEmitted = new EventEmitter<string>()
  
  nameCharacter$ = Observable<string>
  searchQuery = new FormControl('');
  
  ngOnInit(): void {
    this.onSubmit()
    
  }
  
  onSubmit() {
     this.searchQuery.valueChanges.pipe(debounceTime(500),distinctUntilChanged()).subscribe({
        next: value => {
          try {
            if(value) this.searchEmitted.emit(value)
          } catch (error) {
            console.log(error)
          }
        }
     })
  }



 

}
