import { Component, inject, Input, OnInit } from '@angular/core';
import { animeItem } from '../../Models/animeItem';
import { DiscoverService } from '../../Service/discover.service';
import { AnimeInfo } from '../../Models/animeInfo';
import { Episode } from '../../Models/episodes';
import { Router } from '@angular/router';
import { AnimeService } from '../../Service/anime.service';
import { UserManagmentService } from '../../Service/user-managment.service';
import { PopupService } from '../../Service/popup.service';
import { LibraryService } from '../../Service/library.service';
import { CommonModule } from '@angular/common';
import e from 'express';

@Component({
  selector: 'app-anime-item-horizontal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anime-item-horizontal.component.html',
  styleUrl: './anime-item-horizontal.component.scss'
})
export class AnimeItemHorizontalComponent implements OnInit {
  library:LibraryService=inject(LibraryService)
  popupService:PopupService=inject(PopupService)
  userservise:UserManagmentService=inject(UserManagmentService)
  @Input() anime:animeItem = new animeItem(0,0,'','',0,'',0);
  animeInfo: AnimeInfo = new AnimeInfo(
  0, 0, "", "", "", "", "", "", 0, false, "", "", 0, 0, "", "", "", "", 0, 0, [], [], [], [], 
  new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false),new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false));
  animeService:AnimeService=inject(AnimeService)
  router:Router=inject(Router)
  errorImg: boolean = true;
  
  // This method is called when the image loads successfully
  onImageLoad(): void {
    this.errorImg = false;
  }
  ngOnInit(){
    this.getAnimeInfo()
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
addAnimeToLibrary(){
  this.popupService.openPopup("Anime Status", "res",true,true)
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
        this.popupService.openPopup("Anime Status", "An error occurred while adding the anime to the library. Please try again later.", false)
        
      },
      complete:()=>{}
    })
  }
  else{
    this.popupService.openPopup("Anime Status", "user is not signed in cant add to library without sign ing in",false)  
  }
}
onImageError(event: Event) {
  const element = event.target as HTMLImageElement;
  if(this.animeInfo.posterPath.includes("null") || this.animeInfo.posterPath.length ==0){
    element.src = 'images/S_logo.svg';
  }
  else{
    element.src = this.animeInfo.posterPath;
  }
}
}
