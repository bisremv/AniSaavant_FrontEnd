import { Component, Input } from '@angular/core';
import { AnimeInfo } from '../../Models/animeInfo';
import { CommonModule } from '@angular/common';
import { Episode } from '../../Models/episodes';

@Component({
  selector: 'app-anime-detail-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anime-detail-hero.component.html',
  styleUrl: './anime-detail-hero.component.scss'
})
export class AnimeDetailHeroComponent {
  @Input()
  animeInfo: AnimeInfo = new AnimeInfo(
    0, 0, "", "", "", "", "", "", 0, false, "", "", 0, 0, "", "", "", "", 0, 0, [], [], [], [], 
    new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false),new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false));
    getOverviewForSmallScreen() {
    if(this.animeInfo.overview.length>180){
      return this.animeInfo.overview.substring(0,180)+"...";
    }
      return this.animeInfo.overview;
    
  }
  }
