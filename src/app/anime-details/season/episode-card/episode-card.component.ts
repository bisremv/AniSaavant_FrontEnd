import { Component, Input } from '@angular/core';
import { Episode } from '../../../Models/episodes';

@Component({
  selector: 'app-episode-card',
  standalone: true,
  imports: [],
  templateUrl: './episode-card.component.html',
  styleUrl: './episode-card.component.scss'
})
export class EpisodeCardComponent {
 
@Input() episode:Episode = new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false);
getRating() {
  return this.episode.voteAverage * 10;
}
getStyleRating() {
  return "--value:"+(this.episode.voteAverage*10)+";"
}


getTitle(){
  if(this.episode.name.length > 20){
    return this.episode.name.substring(0,18) +"..."
  }
  return this.episode.name
}
}
