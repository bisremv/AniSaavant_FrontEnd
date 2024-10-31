import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { animeItem } from '../../Models/animeItem';
import { AnimeInfo } from '../../Models/animeInfo';
import { Episode } from '../../Models/episodes';
import { AnimeService } from '../../Service/anime.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LibraryService } from '../../Service/library.service';
import { PopupService } from '../../Service/popup.service';
import { UserManagmentService } from '../../Service/user-managment.service';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss'
})
export class SearchItemComponent {

  @Input() anime!: animeItem;
  @Input() inLibrary:boolean=false;
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();
  smallScreenTitle:string=''
  library:LibraryService=inject(LibraryService)
  popupService:PopupService=inject(PopupService)
  userService:UserManagmentService=inject(UserManagmentService)
  
  animeInfo: AnimeInfo = new AnimeInfo(
    0, 0, "", "", "", "", "", "", 0, false, "", "", 0, 0, "", "", "", "", 0, 0, [], [], [], [], 
    new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false),new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false));
    animeService:AnimeService=inject(AnimeService)
  router:Router=inject(Router)
  ngOnInit(){
    this.getAnimeInfo()
  }
  
  navigateToAnime() {
    this.router.navigate(['/anime'], { queryParams: { animeId: this.anime.animeId,tmdbId:this.anime.tmdbId } });
  }
  getAnimeInfo(){
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
    const truncatedTitle = this.animeInfo.title.substring(0, 23);
    this.anime.title =truncatedTitle.substring(0, truncatedTitle.lastIndexOf(' ')) + " ...";
  }else{
    this.anime.title=this.animeInfo.title;
  }
  if(this.animeInfo.title.length>13){
    const truncatedTitle = this.animeInfo.title.substring(0, 23);
    this.smallScreenTitle =truncatedTitle.substring(0, truncatedTitle.lastIndexOf(' ')) + " ...";
  }else{
    this.smallScreenTitle=this.animeInfo.title;
  }
  
  this.anime.episode=this.animeInfo.numberOfEpisodes;
  this.anime.status=this.animeInfo.status;
}
addAnimeToLibrary(){
  if(this.userService.isLoggedIn()){
    this.popupService.openPopup("Anime Status", "An error occurred while adding the anime to the library. Please try again later.", false)
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
removeFromLibrary() {
  if(this.userService.isLoggedIn()){
  this.popupService.openPopup("Anime Status", "res",false,true)
    this.library.removeAnimeFromLibrary(this.animeInfo.animeId).subscribe({
      next:(res)=>{
        let type:boolean=true;
        if(res!="Anime deleted from library"){
          type=false;
        }
        this.popupService.openPopup("Anime Status", res,type)
      },
      error:(err)=>{
        this.popupService.openPopup("Anime Status", "An error occurred while removing the anime from the library. Please try again later.", false)
        
      },
      complete:()=>{
        this.deleted.emit( this.animeInfo.animeId );
      }
    })
  }
  else{
    this.popupService.openPopup("Anime Status", "user is not signed in cant add to library without sign ing in",false)  
  }
}
onImageError(event: Event) {
  const element = event.target as HTMLImageElement;
  element.src = 'images/S_logo.svg';
    
}

}
