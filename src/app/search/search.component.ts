import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnimeMangaToggleComponent } from "../Components/anime-manga-toggle/anime-manga-toggle.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterModule, AnimeMangaToggleComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

}
