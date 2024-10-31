import { Component, inject, OnInit } from '@angular/core';
import { MangaDetailHeroComponent } from "./manga-detail-hero/manga-detail-hero.component";
import { ChapterListComponent } from "./chapter-list/chapter-list.component";
import { MangaService } from '../Service/manga.service';
import { ActivatedRoute } from '@angular/router';
import { MangaInfo } from '../Models/mangaInfo';
import { CommonModule } from '@angular/common';

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
      } 
    });
  }

}
