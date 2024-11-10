import { Component, input } from '@angular/core';
import { Character } from '../../core/interfaces/characters/characters.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  characters = input.required<Character>();
 

}
