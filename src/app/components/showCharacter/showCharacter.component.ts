import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '../../core/services/characters.services/characters.service';
import { Character } from '../../core/interfaces/characters/characters.interface';

@Component({
  selector: 'app-show-character',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="py-40 px-10 flex justify-center">
  <a 
    href="#" 
    class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img 
      class="object-cover w-full rounded-t-lg h-100 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" 
      src="{{character.image}}" 
      alt="">
     <div 
     class="flex flex-col justify-between p-4 leading-normal">
        <h5 
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {{character.name}}
        </h5>
        <div class="flex gap-4">
          <p 
          class="mb-3 font-normal text-gray-700 dark:text-gray-400">
           {{character.gender}}
          </p>
          <p 
          class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{character.status}}
          </p>
          <p 
          class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{character.species}}
          </p>
        </div>
     </div>
    </a>
  </div>
   
`,
  styleUrl: './showCharacter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShowCharacterComponent {

  route = inject(ActivatedRoute)
  character_SV = inject(CharactersService)
  character!:Character 
  ngOnInit(): void {
    this.getCharacterByID()
    
  }
  getCharacterByID() {
   const id = Number(this.route.snapshot.paramMap.get('id'))
   if(id)
    this.character_SV.getById(id).subscribe({
      next: (data:Character) =>{
        this.character = data
        console.log('Personaje seleccionado',this.character)
      }
  })
   
 }
 }

