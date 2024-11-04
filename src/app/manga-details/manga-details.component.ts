import { Component, inject, OnInit } from '@angular/core';
import { MangaDetailHeroComponent } from "./manga-detail-hero/manga-detail-hero.component";
import { ChapterListComponent } from "./chapter-list/chapter-list.component";
import { MangaService } from '../Service/manga.service';
import { ActivatedRoute } from '@angular/router';
import { MangaInfo } from '../Models/mangaInfo';
import { CommonModule } from '@angular/common';
import { PopupService } from '../Service/popup.service';
import { LibraryService } from '../Service/library.service';
import { UserManagmentService } from '../Service/user-managment.service';
import { MangaItem } from '../Models/MangaItem';

@Component({
  selector: 'app-manga-details',
  standalone: true,
  imports: [MangaDetailHeroComponent, ChapterListComponent , CommonModule],
  templateUrl: './manga-details.component.html',
  styleUrl: './manga-details.component.scss'
})
export class MangaDetailsComponent implements OnInit {
  mangaService:MangaService=inject(MangaService);
  mangaInfo:MangaInfo=new MangaInfo(0,0,0,"","","","","","","",0,[]);
  activeRoute:ActivatedRoute=inject(ActivatedRoute);
  mangaLoaded:boolean=false;
  popupService: PopupService = inject(PopupService); // Add this line to inject the PopupService
  library: LibraryService = inject(LibraryService); // Add this line to inject the LibraryService
  userservise: UserManagmentService = inject(UserManagmentService); // Add this line to inject the   
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
  ngOnInit(){
    this.activeRoute.queryParams.subscribe(params => {
      this.mangaInfo.itemLink = params['itemLink'];
      this.mangaInfo.extId = params['extId'];
      this.getMangaInfo();
    });

  }
  getMangaInfo() {
    this.mangaService.getMangaInfo(this.mangaInfo.itemLink, this.mangaInfo.extId).subscribe({
      next:(response: any) => {
        this.mangaInfo = response;
        this.mangaLoaded = true;
        this.manga.title = this.mangaInfo.title;
        this.manga.img = this.mangaInfo.itemImg;
        this.manga.itemLink = this.mangaInfo.itemLink;
        this.manga.extId = this.mangaInfo.extId;
        this.manga.chapterNumber = this.mangaInfo.chapterNumber;
        this.manga.type = this.mangaInfo.type;
        this.manga.status = this.mangaInfo.status;
        this.manga.mangaId = this.mangaInfo.mangaId;
      } 
    });
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
}
