import { Component, inject, Input, OnInit } from '@angular/core';
import { AnimeHero } from '../../../Models/anime_hero';
import { UserManagmentService } from '../../../Service/user-managment.service';
import { PopupService } from '../../../Service/popup.service';
import { LibraryService } from '../../../Service/library.service';
import { Router, RouterModule } from '@angular/router';
import { AnimeService } from '../../../Service/anime.service';
import { AnimeInfo } from '../../../Models/animeInfo';
import { Episode } from '../../../Models/episodes';

@Component({
  selector: 'app-anime-hero',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './anime-hero.component.html',
  styleUrl: './anime-hero.component.scss'
})
export class AnimeHeroComponent implements OnInit {
  @Input() 
  anime:AnimeHero =new AnimeHero(0,0,'','','',0,0,"","");
  library:LibraryService=inject(LibraryService)
  popupService:PopupService=inject(PopupService)
  userservise:UserManagmentService=inject(UserManagmentService)
  animeService:AnimeService=inject(AnimeService);
  animeInfo: AnimeInfo = new AnimeInfo(
    0, 0, "", "", "", "", "", "", 0, false, "", "", 0, 0, "", "", "", "", 0, 0, [], [], [], [], 
    new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false),new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false));
  router:Router=inject(Router)
  
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
  getStyleRating() {
    let vote_average=(this.animeInfo.voteAverage *10)
    return "--value:"+vote_average+";"
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
ngOnInit(): void {
  this.getAnimeInfo();
}
getAnimeInfo(){
  if(this.anime.animeId==null){
    this.anime.animeId=0;
  }
  this.animeService.getAnimeInfo(this.anime.tmdbId,this.anime.animeId).subscribe({
    next:(res)=>{
      this.animeInfo=res as AnimeInfo;
      }
  })
}

addAnimeToLibrary(){
  if(this.userservise.isLoggedIn()){
    this.library.addAnimeToLibrary(this.animeInfo,this.animeInfo.seasons).subscribe({
      next:(res)=>{
        let type:boolean=true;
        if(res!="Anime added to library"){
          type=false;
        }
        this.popupService.openPopup("Anime Status", res,type)
      },
      error:(err)=>{
        this.popupService.openPopup("Anime Status", err.message,false)
        
        
      },
      complete:()=>{}
    })
  }
  else{
    this.popupService.openPopup("Anime Status", "user is not signed in cant add to library without sign ing in",false)  
  }
}
navigateToAnime() {
  this.router.navigate(['/anime'], { queryParams: { animeId: this.animeInfo.animeId,tmdbId:this.animeInfo.tmdbId } });
}
}
