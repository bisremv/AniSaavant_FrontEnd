import { Component, Input } from '@angular/core';
import { MangaInfo } from '../../Models/mangaInfo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manga-detail-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manga-detail-hero.component.html',
  styleUrl: './manga-detail-hero.component.scss'
})
export class MangaDetailHeroComponent {
@Input() manga:MangaInfo=new MangaInfo(0,0,0,"","","","","","","",0,[]);
;
}
