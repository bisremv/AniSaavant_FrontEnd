import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AnimeInfo } from '../../Models/animeInfo';
import { Episode } from '../../Models/episodes';
import { AnimeService } from '../../Service/anime.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Season } from '../../Models/season';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent implements OnInit {

@Input()  animeInfo: AnimeInfo = new AnimeInfo(
    0, 0, "", "", "", "", "", "", 0, false, "", "", 0, 0, "", "", "", "", 0, 0, [], [], [], [], 
    new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false),new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false));
  animeService:AnimeService=inject(AnimeService);
  Source1VideoUrl: string='';
  Source2VideoUrl: string='';
  selectedSource:Sources=Sources.Source1;
  isExpanded:boolean=false;
  sanitizer: DomSanitizer=inject(DomSanitizer);
  @Input()  episodeNumber:number=0;
  @Input()  seasonNumber:number=0;
  @Input()tmdbId:number=0;
  @Input() animeId:number=0;
  isLoading:boolean=false;
  previousEpisode:number|null=null;
  nextEpisode:number|null=null;
  isSeasonLoading:boolean=false;
  router:Router=inject(Router);
  season:Season= new Season(0,"",0,"","","",0,0,[]);
  @Output() isPlayerExpanded:EventEmitter<boolean> =new EventEmitter<boolean>();
  toggleExpanded() {
    this.isExpanded=!this.isExpanded;
    this.isPlayerExpanded.emit(this.isExpanded);
  }  
ngOnInit(): void {
  this.getSeason();

}
getSeason(){
  this.isSeasonLoading=true;
  this.animeService.getSeason(this.tmdbId,this.seasonNumber).subscribe({
    next:(res)=>{
      this.season=res;
  this.getEpisode()
    },
    error:()=>{
      this.isSeasonLoading=false;
    },
    complete:()=>{
      this.isSeasonLoading=false;
    }
  });
}

getEpisode(){
    const currentIndex = this.season.episodes.findIndex(ep => ep.episodeNumber == this.episodeNumber);
    console.log(currentIndex,"ssds525asddas7asdx",this.season);
    if (currentIndex < 0) {
      console.warn('Current season not found');
    }
    else{
      // Set previousSeason to null if it's the first season, otherwise set to the previous season number
      this.previousEpisode = currentIndex > 0 ? this.season.episodes[currentIndex - 1].episodeNumber : null;
      // Set nextSeason to null if it's the last season, otherwise set to the next season number
      this.nextEpisode = currentIndex < this.season.episodes.length - 1 ? this.season.episodes[currentIndex + 1].episodeNumber : null;
      
    this.Source1VideoUrl = 'https://vidsrc.icu/embed/tv/'+this.tmdbId+'/'+this.seasonNumber+'/'+this.episodeNumber;
    this.Source2VideoUrl = 'https://vidsrc.dev/embed/tv/'+this.tmdbId+'/'+this.seasonNumber+'/'+this.episodeNumber; //MAIN
    console.log(this.Source1VideoUrl);
    console.log(this.Source2VideoUrl);
    }
  }

  navigateToStream(episodeNumber: number | null) {
    this.router.navigate(['/anime/stream'], {
      queryParams: {
        tmdbId: this.tmdbId,
        animeId: this.animeId,
        seasonNumber: this.seasonNumber,
        episodeNumber: episodeNumber
      },
      replaceUrl: true // Forces route replacement, not just pushing state
    }).then(() => {
      // Refresh the page after the route has successfully changed
      window.location.reload();
    });
  }
  
get Sources(){
    return Sources;
  }
}
enum Sources{
  Source1='one',
  Source2='two',
}