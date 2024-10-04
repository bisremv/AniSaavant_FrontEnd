import { Component, inject, Input } from '@angular/core';
import { animeItem } from '../../Models/animeItem';
import { AnimeInfo } from '../../Models/animeInfo';
import { Episode } from '../../Models/episodes';
import { AnimeService } from '../../Service/anime.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss'
})
export class SearchItemComponent {
  @Input() anime!: animeItem;
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
  this.anime.img=this.animeInfo.posterPath;
  if(this.animeInfo.title.length>19){
    this.anime.title=this.animeInfo.title.substring(0,19)+"...";
  }else{
    this.anime.title=this.animeInfo.title;
  }
  this.anime.episode=this.animeInfo.numberOfEpisodes;
  this.anime.status=this.animeInfo.status;
}

}
