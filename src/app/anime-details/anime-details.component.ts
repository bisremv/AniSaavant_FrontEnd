import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeInfo } from '../Models/animeInfo';
import { DiscoverService } from '../Service/discover.service';
import { CommonModule } from '@angular/common';
import { AnimeDetailHeroComponent } from "./anime-detail-hero/anime-detail-hero.component";
import { InformationComponent } from "./information/information.component";
import { SeasonCarouselComponent } from "./season-carousel/season-carousel.component";
import { AiredEpisodeComponent } from "./aired-episode/aired-episode.component";
import { Episode } from '../Models/episodes';
import { ProductionCompanyComponent } from "./production-company/production-company.component";
import { AnimeVideosComponent } from "./anime-videos/anime-videos.component";
import { AnimeService } from '../Service/anime.service';
import { AnimeGroupHorizontalComponent } from "../Components/anime-group-horizontal/anime-group-horizontal.component";

@Component({
  selector: 'app-anime-details',
  standalone: true,
  imports: [CommonModule, AnimeDetailHeroComponent, InformationComponent, SeasonCarouselComponent, AiredEpisodeComponent, ProductionCompanyComponent, AnimeVideosComponent, AnimeGroupHorizontalComponent],
  templateUrl: './anime-details.component.html',
  styleUrl: './anime-details.component.scss'
})
export class AnimeDetailsComponent implements OnInit {
  animeInfo: AnimeInfo = new AnimeInfo(
    0, 0, "", "", "", "", "", "", 0, false, "", "", 0, 0, "", "", "", "", 0, 0, [], [], [], [], 
    new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false),new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false));
  similarList=[];
  isLoading:boolean=false;
  isSimilarLoading:boolean=false;
  isAnimeLoading:boolean=false;
  anime:AnimeService =inject(AnimeService)
  activeRoute:ActivatedRoute=inject(ActivatedRoute);
ngOnInit(){
  this.activeRoute.queryParams.subscribe(params => {
    this.animeInfo.animeId = params['animeId'];
    this.animeInfo.tmdbId = params['tmdbId'];
    // Fetch the data or update the view with new params
    this.getAnimeInfo();
    this.getSimilarAnime();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  }
getAnimeInfo(){
  this.isAnimeLoading=true;
  this.anime.getAnimeInfo(this.animeInfo.tmdbId,this.animeInfo.animeId).subscribe({
    next:(res)=>{
      this.animeInfo = res;
      this.calculateAnimeInfo();
    },
    error:(err)=>{
      this.isAnimeLoading=false;
    },
    complete:()=>{
      this.isAnimeLoading=false;
    }
  }) 
}

calculateAnimeInfo(){
  let voteAverage = this.animeInfo.voteAverage * 10;
  this.animeInfo.voteAverage = ((voteAverage.toFixed(1) as unknown) as number);
  }


getSimilarAnime(){
  this.isSimilarLoading=true;
  this.anime.getSimilarAnime(this.animeInfo.animeId).subscribe({
    next:(res)=>{
      this.similarList = res.map((anticipatedItem :any) => ({
      animeId: anticipatedItem.ids.trakt,        // Mapping animeId (or use `id` if not available)
      tmdbId: anticipatedItem.ids.tmdb,          // Mapping tmdbId
      title: anticipatedItem.title,  
    }));
    },
    error:()=>{
      this.isSimilarLoading=false;
    },
    complete:()=>{
      this.isSimilarLoading=false;
    }
  });
}

}