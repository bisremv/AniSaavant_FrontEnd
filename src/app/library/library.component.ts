import { Component } from '@angular/core';
import { AnimeMangaToggleComponent } from "../Components/anime-manga-toggle/anime-manga-toggle.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [AnimeMangaToggleComponent,RouterModule],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {
  
}