import { Component, Input } from '@angular/core';
import { MangaItem } from '../../Models/MangaItem';

@Component({
  selector: 'app-manga-item',
  standalone: true,
  imports: [],
  templateUrl: './manga-item.component.html',
  styleUrl: './manga-item.component.scss'
})
export class MangaItemComponent {
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
  mangaTitle():string{
    if(this.manga.title.length>20){
      return this.manga.title.substring(0,23)+"...";
    }
    else{ 
      return this.manga.title;
    }
  }
}
