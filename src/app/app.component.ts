import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { initFlowbite } from 'flowbite';
import HomeComponent from './layout/home/home.component';
import { SearchGComponent } from './core/utils/search-g/search-g.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    HomeComponent,
    SearchGComponent,
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'rick_morty';
  
  ngOnInit(): void {
    initFlowbite();
  }
  
}
