import { Component, Input } from '@angular/core';
import { AnimeHero } from '../../../Models/anime_hero';

@Component({
  selector: 'app-anime-hero',
  standalone: true,
  imports: [],
  templateUrl: './anime-hero.component.html',
  styleUrl: './anime-hero.component.scss'
})
export class AnimeHeroComponent {
  @Input() 
  anime:AnimeHero =new AnimeHero(0,0,'','','',0,0,"","");
  getAnimeTitle(){
    if(this.anime.title.length>28){
    return this.anime.title.substring(0,28)+"...";
  }
  else{ 
    return this.anime.title;
  }
  }
  getRating(){
    return (this.anime.rating * 10).toFixed(1);
  }
  getDescription(){
    if(this.anime.description.length>350){
      return this.anime.description.substring(0,350)+"...";
    }
    else{ 
      return this.anime.description
  }
}
getImage(){
    return this.anime.image;
}
}
