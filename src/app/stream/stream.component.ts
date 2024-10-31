import { Component, inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EpisodeItemComponent } from "./episode-item/episode-item.component";
import { CommonModule } from '@angular/common';
import { RelatedItemComponent } from "./related-item/related-item.component";
import { ActivatedRoute } from '@angular/router';
import { EpisodeListComponent } from "./episode-list/episode-list.component";
import { AnimeInfo } from '../Models/animeInfo';
import { Episode } from '../Models/episodes';
import { AnimeService } from '../Service/anime.service';
import { AnimeDisplayComponent } from "./anime-display/anime-display.component";
import { animeItem } from '../Models/animeItem';
import { VideoPlayerComponent } from "./video-player/video-player.component";
import { Season } from '../Models/season';

@Component({
  selector: 'app-stream',
  standalone: true,
  imports: [EpisodeItemComponent, CommonModule, RelatedItemComponent, EpisodeListComponent, AnimeDisplayComponent, VideoPlayerComponent],
  templateUrl: './stream.component.html',
  styleUrl: './stream.component.scss'
})
export class StreamComponent implements OnInit  {
  animeInfo: AnimeInfo = new AnimeInfo(
    0, 0, "", "", "", "", "", "", 0, false, "", "", 0, 0, "", "", "", "", 0, 0, [], [], [], [], 
    new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false),new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false));
  animeService:AnimeService=inject(AnimeService);
  similarList:animeItem[]= [];
  isPlayerExpanded:boolean=false;
  isEpisodeDescending:boolean = false;
  isNumberList:boolean = false;
  sanitizer: DomSanitizer=inject(DomSanitizer);
  activeRoute: ActivatedRoute=inject(ActivatedRoute);
  seasonNumber:number=0;
  episodeNumber:number=0;
  tmdbId:number=0;
  animeId:number=0;
  season:Season= new Season(0,"",0,"","","",0,0,[]);
  isSeasonLoading:boolean=false;
  ngOnInit(): void {
  this.activeRoute.queryParams.subscribe(params => {
    this.animeId=params['animeId']
    this.tmdbId=params['tmdbId']
    this.seasonNumber=params['seasonNumber']
    this.episodeNumber=params['episodeNumber']
    this.getAnimeInfo();
    this.getSimilarAnime();
    this.getSeason();
    

  })
  }

  togglePlayer(isExpanded: boolean) {
    this.isPlayerExpanded=isExpanded;
  }


  getSeason(){
    this.isSeasonLoading=true;
    this.animeService.getSeason(this.tmdbId,this.seasonNumber).subscribe({
      next:(res)=>{
        this.season=res;
        console.log(this.season);
      },
      error:()=>{
        this.isSeasonLoading=false;
      },
      complete:()=>{
        this.isSeasonLoading=false;
      }
    });
}


  getAnimeInfo(){
    this.animeService.getAnimeInfo(this.tmdbId,this.animeId).subscribe({
      next:(res)=>{
        this.animeInfo = res;
      }
    }) 
  }


  getSimilarAnime(){
    this.animeService.getSimilarAnime(this.animeId).subscribe({
      next:(res)=>{
        this.similarList = res.map((anticipatedItem :any) => ({
        animeId: anticipatedItem.ids.trakt,        // Mapping animeId (or use `id` if not available)
        tmdbId: anticipatedItem.ids.tmdb,          // Mapping tmdbId
        title: anticipatedItem.title,  
      }));
      }
    });
  }
}
