import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnimeMangaToggleComponent } from "../Components/anime-manga-toggle/anime-manga-toggle.component";
import { GenerGroupingComponent } from "../Components/gener-grouping/gener-grouping.component";
@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [RouterModule, AnimeMangaToggleComponent, GenerGroupingComponent],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.scss'
})
export class DiscoverComponent {

}
