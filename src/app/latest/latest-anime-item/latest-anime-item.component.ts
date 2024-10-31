import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpcomingEpisode } from '../../Models/upcomingEpisode';
import { AnimeService } from '../../Service/anime.service';
import { animeItem } from '../../Models/animeItem';
import { AnimeInfo } from '../../Models/animeInfo';
import { Episode } from '../../Models/episodes';
import { PageControlsComponent } from "../../manga-details/page/page-controls/page-controls.component";

@Component({
  selector: 'app-latest-anime-item',
  standalone: true,
  imports: [CommonModule, FormsModule, PageControlsComponent],
  templateUrl: './latest-anime-item.component.html',
  styleUrl: './latest-anime-item.component.scss'
})
export class LatestAnimeItemComponent implements OnInit {
@Input() episode:UpcomingEpisode=new UpcomingEpisode(0,0,"","",new Date(),0,0);
@Input() activeOrder:Order=Order.Mid;
countdown: string = '';
countDownSefix: string = '';
private countdownInterval: any;
anime: AnimeInfo = new AnimeInfo(
  0, 0, "", "", "", "", "", "", 0, false, "", "", 0, 0, "", "", "", "", 0, 0, [], [], [], [], 
  new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false),new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false));


animeService:AnimeService=inject(AnimeService);
ngOnInit(): void {
this.animeService.getAnimeInfo(this.episode.tmdbId,this.episode.animeId).subscribe({
  next:(res)=>{
    this.anime=res as AnimeInfo;
    console.log("anime",this.anime)
  }
});
this.startCountdown();
}

getEpisodeDate(){
  let date = new Date(this.episode.first_aired);
  return date.toUTCString();
}

ngOnDestroy(): void {
  if (this.countdownInterval) {
    clearInterval(this.countdownInterval);
  }
}

startCountdown() {
  this.countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const airDate = this.episode.first_aired.getTime();
    const distance = airDate - now;
    
    if (distance < 0) {
      // Episode has aired
      this.countdown = "Episode has aired!";
      clearInterval(this.countdownInterval);
      return;
    }

    // Time calculations for days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (days > 0) {
      this.countdown = `${days+1}`;
      this.countDownSefix='days';
    } else if (hours > 0) {
      this.countdown = `${hours}`;
      this.countDownSefix='hours';
    } else if (minutes > 0) {
      this.countdown = `${minutes}`;
      this.countDownSefix='minutes';
    } else {
      this.countdown = `${seconds}`;
      this.countDownSefix='seconds';
    }
  }, 1000);
}


get Order() {
  return Order;
}


onImageError(event: Event) {
  const element = event.target as HTMLImageElement;
  element.src = 'images/S_logo.svg';
}

}
enum Order{
  First='first',
  Mid='middle',
  Last='last'
}
