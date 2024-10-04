import { Component, Input } from '@angular/core';
import { MangaInfo } from '../../Models/mangaInfo';

@Component({
  selector: 'app-manga-detail-hero',
  standalone: true,
  imports: [],
  templateUrl: './manga-detail-hero.component.html',
  styleUrl: './manga-detail-hero.component.scss'
})
export class MangaDetailHeroComponent {
@Input() manga:MangaInfo=new MangaInfo(0,0,0,"","","","","","","",0,[]);
;
}
