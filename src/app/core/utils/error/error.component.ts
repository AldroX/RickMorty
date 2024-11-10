import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
         <div 
        class="max-w-sm mt-4 ml-56 felx flex-col justify-centeri"
        > 
        <div class="">
          <img 
          src="assets/img/alert-svgrepo-com.svg" 
          alt=""
          class="w-full overflow-hidden max-w-16 max-h-14"
          >
        </div>
            <div>
              <h1 
              id="1"
              class="lg:text-5xl sm:text-sm md:text-lg  text-center text-black"
              >{{messageError()}}</h1>
            </div>
        </div>
  `,
  styleUrl: './error.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
   messageError = input.required<string>()
 }
