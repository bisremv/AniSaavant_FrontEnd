import { Component, Input } from '@angular/core';
import { Season } from '../../../Models/season';

@Component({
  selector: 'app-season-item',
  standalone: true,
  imports: [],
  templateUrl: './season-item.component.html',
  styleUrl: './season-item.component.scss'
})
export class SeasonItemComponent {
  @Input()
  season:Season= new Season(0,"",0,"","","",0,0);
  
  getAirDate() {
    if(this.season.airDate === null) {
      return "N/A";
    }
    return this.season.airDate;
  }
/* 
seasonId: number, 
airDate: string,
episodeCount: number,
name: string, 
overview: string, 
posterPath: string, 
seasonNumber: number, 
voteAverage: number
*/
}
