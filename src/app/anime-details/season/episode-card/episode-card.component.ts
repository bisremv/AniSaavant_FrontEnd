import { Component, inject, Input } from '@angular/core';
import { Episode } from '../../../Models/episodes';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-episode-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './episode-card.component.html',
  styleUrl: './episode-card.component.scss'
})
export class EpisodeCardComponent {
router:Router=inject(Router);
@Input() animeId:number=0;
@Input() episode:Episode = new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false);
getRating() {
  return (this.episode.voteAverage * 10).toFixed(1);
}
getStyleRating() {
  return "--value:"+(this.episode.voteAverage*10)+";"
}
navigateToStream() {
  this.router.navigate(['/anime/stream'], { queryParams: { tmdbId: this.episode.tmdbId,
    animeId: this.animeId, seasonNumber: this.episode.seasonNumber, 
    episodeNumber: this.episode.episodeNumber } });
}


getTitle(){
  if(this.episode.name.length > 20){
    return this.episode.name.substring(0,18) +"..."
  }
  return this.episode.name
}
}
