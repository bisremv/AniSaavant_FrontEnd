import { Component, inject, OnInit } from '@angular/core';
import { EpisodeCardComponent } from "./episode-card/episode-card.component";
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '../../Service/anime.service';
import { Season } from '../../Models/season';
import { CommonModule } from '@angular/common';
import { AnimeInfo } from '../../Models/animeInfo';
import { Episode } from '../../Models/episodes';
import { EmptyPageComponent } from "../../Components/empty-page/empty-page.component";

@Component({
  selector: 'app-season',
  standalone: true,
  imports: [EpisodeCardComponent, CommonModule, EmptyPageComponent],
  templateUrl: './season.component.html',
  styleUrl: './season.component.scss'
})
export class SeasonComponent implements OnInit {
  animeInfo: AnimeInfo = new AnimeInfo(
    0, 0, "", "", "", "", "", "", 0, false, "", "", 0, 0, "", "", "", "", 0, 0, [], [], [], [], 
    new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false),new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false));
  animeService:AnimeService=inject(AnimeService);
  activatedRoute: ActivatedRoute=inject(ActivatedRoute);
  router:Router=inject(Router);
  season:Season= new Season(0,"",0,"","","",0,0,[]);
  previousSeason:number|null=null;
  nextSeason:number|null=null;
  animeId:number=0;
  tmdbId:number=0;
  seasonNumber:number=0;
  isLoading:boolean=false;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.seasonNumber=params['seasonNumber']
      this.animeId=params['animeId']
      this.tmdbId=params['tmdbId']
      this.getSeason();
      this.getAnimeInfo()
    });
  }

changeSeason(seasonNumber:number | null){
  if(seasonNumber === null){
    return;
  }
  this.router.navigate(['/anime/season'], { queryParams: { tmdbId: this.tmdbId,animeId: this.animeId, seasonNumber: seasonNumber } });
}

getSeasonData() {
    const currentIndex = this.animeInfo.seasons.findIndex(season => season.seasonNumber == this.seasonNumber);
    if (currentIndex < 0) {
      console.warn('Current season not found');
    }
    else{
      // Set previousSeason to null if it's the first season, otherwise set to the previous season number
      this.previousSeason = currentIndex > 0 ? this.animeInfo.seasons[currentIndex - 1].seasonNumber : null;
      // Set nextSeason to null if it's the last season, otherwise set to the next season number
      this.nextSeason = currentIndex < this.animeInfo.seasons.length - 1 ? this.animeInfo.seasons[currentIndex + 1].seasonNumber : null;
    }
  
  }

getSeason(){
    this.isLoading=true;
    this.animeService.getSeason(this.tmdbId,this.seasonNumber).subscribe({
      next:(res)=>{
        this.season=res;
      },
      error:()=>{
        this.isLoading=false;
      },
      complete:()=>{
        this.isLoading=false;
      }
    });
}
getAnimeInfo(){
  this.animeService.getAnimeInfo(this.tmdbId,this.animeId).subscribe({
    next:(res)=>{
      this.animeInfo = res;
      this.getSeasonData();
    }
  }) 
}

onImageError(event: Event) {
  const element = event.target as HTMLImageElement;
  element.src = 'images/S_logo.svg';
}
}
