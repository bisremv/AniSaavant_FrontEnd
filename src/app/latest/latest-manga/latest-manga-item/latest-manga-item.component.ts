import { Component, Input } from '@angular/core';
import { latestChapter } from '../../../Models/latestchapter';
import { Chapter } from '../../../Models/chapters';
import { MangaInfo } from '../../../Models/mangaInfo';

@Component({
  selector: 'app-latest-manga-item',
  standalone: true,
  imports: [],
  templateUrl: './latest-manga-item.component.html',
  styleUrl: './latest-manga-item.component.scss'
})
export class LatestMangaItemComponent {
@Input() latestManga:latestChapter=new latestChapter(0,false,new Chapter(0,false,"","",0,""),new MangaInfo(0,0,0,"","","","","","","",0,[]),0);


onImageError(event: Event) {
  const element = event.target as HTMLImageElement;
  element.src = 'images/S_logo.svg';
}
}
