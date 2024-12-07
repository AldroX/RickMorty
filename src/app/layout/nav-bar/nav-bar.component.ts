import { Component} from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import HomeComponent from '../home/home.component';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    SearchComponent,
    HomeComponent,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  
}
