import { Component, inject, OnInit } from '@angular/core';
import { EpisodeCardComponent } from "./episode-card/episode-card.component";
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '../../Service/anime.service';
import { Season } from '../../Models/season';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-season',
  standalone: true,
  imports: [EpisodeCardComponent, CommonModule],
  templateUrl: './season.component.html',
  styleUrl: './season.component.scss'
})
export class SeasonComponent implements OnInit {
  animeService:AnimeService=inject(AnimeService);
  activatedRoute: ActivatedRoute=inject(ActivatedRoute);
  season:Season= new Season(0,"",0,"","","",0,0,[]);
  animeId:number=0;
  seasonNumber:number=0;
  
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.seasonNumber=params['seasonNumber']
      this.animeId=params['animeId']
      this.getSeason();
    });
  }



  getSeason(){
    this.animeService.getSeason(this.animeId,this.seasonNumber).subscribe({
      next:(res)=>{
        this.season=res;
      console.log(this.season )
      }
    });
}
}
