import { Component } from '@angular/core';
import { UpcomingAnimeComponent } from "./upcoming-anime/upcoming-anime.component";
import { LatestMangaComponent } from "./latest-manga/latest-manga.component";

@Component({
  selector: 'app-latest',
  standalone: true,
  imports: [UpcomingAnimeComponent, LatestMangaComponent],
  templateUrl: './latest.component.html',
  styleUrl: './latest.component.scss'
})
export class LatestComponent {
  
}