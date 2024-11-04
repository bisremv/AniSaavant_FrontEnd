import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MangaItem } from '../../Models/MangaItem';
import { CommonModule } from '@angular/common';
import { LibraryService } from '../../Service/library.service';
import { PopupService } from '../../Service/popup.service';
import { UserManagmentService } from '../../Service/user-managment.service';
import { flatMap } from 'rxjs';

@Component({
  selector: 'app-manga-grid-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manga-grid-item.component.html',
  styleUrl: './manga-grid-item.component.scss'
})
export class MangaGridItemComponent {
  @Input() inLibrary:boolean=false;
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
  @Output() deleted:EventEmitter<number>=new EventEmitter();
  libraryService:LibraryService=inject(LibraryService)
  userservise:UserManagmentService=inject(UserManagmentService)
  router:Router=inject(Router)
  popupService:PopupService=inject(PopupService)
  mangaTitle():string{

      return this.manga.title;
  }

  navigateToManga() {
    this.router.navigate(['/manga'], { queryParams: { extId: this.manga.extId,itemLink:this.manga.itemLink } });
  }

  removeFromLibrary() {
    
  this.popupService.openPopup("Manga Status", "res",false,true)
    if(this.userservise.isLoggedIn()){
      this.libraryService.removeMangaFromLibrary(this.manga.mangaId).subscribe({
        next:(res)=>{
          let type:boolean=true;
          if(res!="Manga deleted from library"){
            type=false;
          }
          this.popupService.openPopup("Manga Status", res,type)
        },
        error:(err)=>{
            this.popupService.openPopup("Manga Status", "An error occurred while removing the manga from the library", false)
          
        },
        complete:()=>{
  
          this.deleted.emit( this.manga.mangaId);
        }
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
