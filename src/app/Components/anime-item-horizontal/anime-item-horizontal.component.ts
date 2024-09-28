import { Component, inject, Input, OnInit } from '@angular/core';
import { animeItem } from '../../Models/animeItem';
import { DiscoverService } from '../../Service/discover.service';
import { AnimeInfo } from '../../Models/animeInfo';
import { Episode } from '../../Models/episodes';
import { Router } from '@angular/router';
import { AnimeService } from '../../Service/anime.service';

@Component({
  selector: 'app-anime-item-horizontal',
  standalone: true,
  imports: [],
  templateUrl: './anime-item-horizontal.component.html',
  styleUrl: './anime-item-horizontal.component.scss'
})
export class AnimeItemHorizontalComponent implements OnInit {
  @Input()
  anime:animeItem = new animeItem(0,0,'','',0,'',0);
  animeInfo: AnimeInfo = new AnimeInfo(
  0, 0, "", "", "", "", "", "", 0, false, "", "", 0, 0, "", "", "", "", 0, 0, [], [], [], [], 
  new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false),new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false));
  animeService:AnimeService=inject(AnimeService)
  router:Router=inject(Router)
  ngOnInit(){
    this.getAnimeInfo()
    // this.calculateAnimeInfo()
  }
  
  navigateToAnime() {
    this.router.navigate(['/anime'], { queryParams: { animeId: this.anime.animeId,tmdbId:this.anime.tmdbId } });
  }

  
  getAnimeInfo(){
    console.log("this.anime.tmdbId");
    console.log(this.anime);
    this.animeService.getAnimeInfo(this.anime.tmdbId,this.anime.animeId).subscribe({
      next:(res)=>{
        this.animeInfo = res;
        this.calculateAnimeInfo();
      }
    })
  }
calculateAnimeInfo(){
  this.anime.season=this.animeInfo.numberOfSeasons;
  this.anime.img="https://image.tmdb.org/t/p/original"+this.animeInfo.backdropPath;
  this.anime.title=this.animeInfo.title;
  this.anime.episode=this.animeInfo.numberOfEpisodes;
  this.anime.status=this.animeInfo.status;
}

getTitle(){
  if(this.anime.title.length>37){
    return this.anime.title.substring(0,37)+"...";
  }
  else{ 
    return this.anime.title;
  }
}
}
