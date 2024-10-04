import { Component, inject, Input } from '@angular/core';
import { MangaItem } from '../../Models/MangaItem';
import { Router } from '@angular/router';
import { Extension } from '../../Models/Extenison';

@Component({
  selector: 'app-manga-item',
  standalone: true,
  imports: [],
  templateUrl: './manga-item.component.html',
  styleUrl: './manga-item.component.scss'
})
export class MangaItemComponent {
  @Input()
  extId:number=0;

  @Input()
  manga: MangaItem= {
    mangaId: 5844,
    title: 'title',
    status: 'status',
    ChapterNumber: 0,
    img: '',
    type: '',
    progress: 0,
    releaseDate: '',
    itemLink: ''
  }

  router:Router=inject(Router)
  mangaTitle():string{
    if(this.manga.title.length>20){
      return this.manga.title.substring(0,23)+"...";
    }
    else{ 
      return this.manga.title;
    }
  }

  navigateToManga() {
    this.router.navigate(['/manga'], { queryParams: { extId: this.extId,itemLink:this.manga.itemLink } });
  }
}
