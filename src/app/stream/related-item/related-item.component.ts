import { Component, inject, Input } from '@angular/core';
import { animeItem } from '../../Models/animeItem';
import { AnimeInfo } from '../../Models/animeInfo';
import { Episode } from '../../Models/episodes';
import { AnimeService } from '../../Service/anime.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-related-item',
  standalone: true,
  imports: [],
  templateUrl: './related-item.component.html',
  styleUrl: './related-item.component.scss'
})
export class RelatedItemComponent {
@Input() anime:animeItem=new animeItem(0,0,"","",0,"",0);
router:Router=inject(Router);
animeInfo: AnimeInfo = new AnimeInfo(
  0, 0, "", "", "", "", "", "", 0, false, "", "", 0, 0, "", "", "", "", 0, 0, [], [], [], [], 
  new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false),new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false));
animeService:AnimeService=inject(AnimeService);
ngOnInit(){
  this.getAnimeInfo()

}
onImageError(event: Event) {
  const element = event.target as HTMLImageElement;
  element.src = 'images/S_logo.svg';
}
getAnimeInfo(){
  this.animeService.getAnimeInfo(this.anime.tmdbId,this.anime.animeId).subscribe({
    next:(res)=>{
      this.animeInfo = res;
    }
  }) 
}
navigateToAnime() {
  this.router.navigate(['/anime'], { queryParams: { animeId: this.anime.animeId,tmdbId:this.anime.tmdbId } });
}
}
