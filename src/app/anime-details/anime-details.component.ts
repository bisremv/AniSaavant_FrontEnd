import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeInfo } from '../Models/animeInfo';
import { DiscoverService } from '../Service/discover.service';
import { get } from 'http';

@Component({
  selector: 'app-anime-details',
  standalone: true,
  imports: [],
  templateUrl: './anime-details.component.html',
  styleUrl: './anime-details.component.scss'
})
export class AnimeDetailsComponent implements OnInit {
  animeInfo:AnimeInfo=new AnimeInfo( 0,0,"","","","","","",0,false,"","",0,0,"","","","",0,0,[],[],[],[]);
  discover:DiscoverService =inject(DiscoverService)
  activeRoute:ActivatedRoute=inject(ActivatedRoute);
ngOnInit(){
  this.animeInfo.animeId=this.activeRoute.snapshot.queryParams["animeId"];
  this.animeInfo.tmdbId=this.activeRoute.snapshot.queryParams["tmdbId"];
  this.getAnimeInfo();
  console.log(this.animeInfo);
}
getAnimeInfo(){
  this.discover.getAnimeInfo(this.animeInfo.tmdbId,this.animeInfo.animeId).subscribe({
    next:(res)=>{
      this.animeInfo = res;
      this.calculateAnimeInfo();
    }
  })
}

calculateAnimeInfo(){
  
}
}
