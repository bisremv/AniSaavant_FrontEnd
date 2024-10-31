import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { EpisodeItemComponent } from "../episode-item/episode-item.component";
import { AnimeService } from '../../Service/anime.service';
import { Season } from '../../Models/season';
import { AnimeInfo } from '../../Models/animeInfo';
import { Episode } from '../../Models/episodes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-episode-list',
  standalone: true,
  imports: [CommonModule, EpisodeItemComponent],
  templateUrl: './episode-list.component.html',
  styleUrl: './episode-list.component.scss'
})
export class EpisodeListComponent  {
  router:Router=inject(Router);
  isEpisodeDescending:boolean = false;
  isNumberList:boolean = false;
  @Input() seasonNumber:number=0;
  @Input() animeId:number=0;
  
  @Input() currentEpisodeNumber:number=0;
  @Input() tmdbId:number=0;
  isLoading:boolean=false;
  animeService:AnimeService=inject(AnimeService);
  @Input() season:Season= new Season(0,"",0,"","","",0,0,[]);
  @Input() animeInfo: AnimeInfo = new AnimeInfo(
    0, 0, "", "", "", "", "", "", 0, false, "", "", 0, 0, "", "", "", "", 0, 0, [], [], [], [], 
    new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false),new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false));
 
  ngONInit(): void {

  }

  changeEpListStyle(isTitleList: boolean) {
    if (isTitleList) {
      this.isNumberList = false;
    }
    if (!isTitleList) {
      this.isNumberList = true;
    }
  }
  toggleEpisodeDescending() {
    this.isEpisodeDescending = !this.isEpisodeDescending;
}

changeSeason(seasonNumber: number) {
    this.router.navigate(['/anime/stream'], {
      queryParams: {
        tmdbId: this.tmdbId,
        animeId: this.animeInfo.animeId,
        seasonNumber: seasonNumber,
        episodeNumber: 1
      },
      replaceUrl: true // Forces route replacement, not just pushing state
    }).then(() => {
      // Refresh the page after the route has successfully changed
      window.location.reload();
    });
  }
}
