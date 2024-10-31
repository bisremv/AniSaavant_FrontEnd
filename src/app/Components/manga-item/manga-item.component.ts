import { Component, inject, Input } from '@angular/core';
import { MangaItem } from '../../Models/MangaItem';
import { Router } from '@angular/router';
import { Extension } from '../../Models/Extenison';
import { LibraryService } from '../../Service/library.service';
import { PopupService } from '../../Service/popup.service';
import { UserManagmentService } from '../../Service/user-managment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manga-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manga-item.component.html',
  styleUrl: './manga-item.component.scss'
})
export class MangaItemComponent {
  @Input()
  extId:number=0;
  library:LibraryService=inject(LibraryService)
  popupService:PopupService=inject(PopupService)
  userservise:UserManagmentService=inject(UserManagmentService)
  
  @Input()
  manga: MangaItem= {
    mangaId: 0,
    title: '',
    status: '',
    chapterNumber: 0,
    img: '',
    type: '',
    progress: 0,
    releaseDate: '',
    itemLink: '',
    extId: 0
  }
  router:Router=inject(Router)
  mangaTitle():string{
    if(this.manga.title.length>25){
      const truncatedTitle = this.manga.title.substring(0, 25);
      return truncatedTitle.substring(0, truncatedTitle.lastIndexOf(' ')) + " ...";
  }
    else{ 
      return this.manga.title;
    }
  }

  navigateToManga() {
    this.router.navigate(['/manga'], { queryParams: { extId: this.extId,itemLink:this.manga.itemLink } });
  }

  addMangaToLibrary(){
    if(this.userservise.isLoggedIn()){
      
  this.popupService.openPopup("Manga Status", "res",true,true)
      this.library.addMangaToLibrary(this.manga,[]).subscribe({
        next:(res)=>{
          let type:boolean=true;
          if(res!="Manga added to library"){
            type=false;
          }
          this.popupService.openPopup("Manga Status", res,type)
        },
        error:(err)=>{
            this.popupService.openPopup("Manga Status", "An error occurred while adding the manga to the library. Please try again later.", false)
          
        },
        complete:()=>{}
      })
    }
    else{
    this.popupService.openPopup("Manga Status", "user is not signed in cant add to library without sign ing in",false)  
    }
  }
  onImageError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'images/S_logo.svg';
}
  
}
