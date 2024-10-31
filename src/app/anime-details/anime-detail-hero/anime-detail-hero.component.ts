import { Component, inject, Input } from '@angular/core';
import { AnimeInfo } from '../../Models/animeInfo';
import { CommonModule } from '@angular/common';
import { Episode } from '../../Models/episodes';
import { PopupService } from '../../Service/popup.service';
import { LibraryService } from '../../Service/library.service';
import { UserManagmentService } from '../../Service/user-managment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anime-detail-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anime-detail-hero.component.html',
  styleUrl: './anime-detail-hero.component.scss'
})
export class AnimeDetailHeroComponent {
  @Input()
  animeInfo: AnimeInfo = new AnimeInfo(
    0, 0, "", "", "", "", "", "", 0, false, "", "", 0, 0, "", "", "", "", 0, 0, [], [], [], [], 
    new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false),new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false));
  library:LibraryService=inject(LibraryService)
  popupService:PopupService=inject(PopupService)
  router:Router=inject(Router)
  userservise:UserManagmentService=inject(UserManagmentService)
  getRating() {
    return (this.animeInfo.voteAverage );
  }
  getStyleRating() {
    return "--value:"+(this.animeInfo.voteAverage)+";"
  }

getOverview() {
    if(this.animeInfo.overview.length>180){
      return this.animeInfo.overview.substring(0,180)+"...";
    }
      return this.animeInfo.overview;  
  }
  navigateToStream() {
    this.router.navigate(['/anime/stream'], {
      queryParams: {
        tmdbId: this.animeInfo.tmdbId,
        animeId: this.animeInfo.animeId,
        seasonNumber: this.animeInfo.seasons[ this.animeInfo.seasons[0].seasonNumber === 0 ? 1 : 0].seasonNumber,
        episodeNumber: 1
      },
      replaceUrl: true // Forces route replacement, not just pushing state
    }).then(() => {
      // Refresh the page after the route has successfully changed
      window.location.reload();
    });
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
    this.popupService.openPopup("Anime Status", "user is not signed in cant add to library without sign ing in",false)  
  }

  }
