import { Component, inject, Input } from '@angular/core';
import { Season } from '../../../Models/season';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-season-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './season-item.component.html',
  styleUrl: './season-item.component.scss'
})
export class SeasonItemComponent {
  @Input()
  season:Season= new Season(0,"",0,"","","",0,0,[]);
  @Input()
  tmdbId:number=0;
  @Input()
  animeId:number=0;
  route:Router=inject(Router);
  getAirDate() {
    if(this.season.airDate === null) {
      return "N/A";
    }
    return this.season.airDate;
  }
  navigateToSeasons(){
    this.route.navigate(['/anime/season'], { queryParams: { tmdbId: this.tmdbId,animeId: this.animeId, seasonNumber: this.season.seasonNumber } });
}

onImageError(event: Event) {
  const element = event.target as HTMLImageElement;
  element.src = 'images/S_logo.svg';
}

}
