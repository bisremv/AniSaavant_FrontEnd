import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Episode } from '../../Models/episodes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-episode-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './episode-item.component.html',
  styleUrl: './episode-item.component.scss'
})
export class EpisodeItemComponent {
  @Input() animeId:number=0;
  @Input() isNumberList: boolean = true;
  @Input()episode: Episode=new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false);
  router:Router=inject(Router);
  onImageError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'images/S_logo.svg';
  }
getOverview(){
  if(this.episode.overview.length>119){
    const truncatedTitle = this.episode.overview.substring(0, 120);
    return truncatedTitle.substring(0, truncatedTitle.lastIndexOf(' ')) + " ...";
  }else{
    return this.episode.overview
  }
}


changeEpisode() {
  this.router.navigate(['/anime/stream'], {
    queryParams: {
      tmdbId: this.episode.tmdbId,
      animeId: this.animeId,
      seasonNumber: this.episode.seasonNumber,
      episodeNumber: this.episode.episodeNumber
    },
    replaceUrl: true // Forces route replacement, not just pushing state
  }).then(() => {
    // Refresh the page after the route has successfully changed
    window.location.reload();
  });
}
}
