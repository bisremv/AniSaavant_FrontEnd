import { Component, Input } from '@angular/core';
import { MangaHero } from '../../../Models/MangaHero';

@Component({
  selector: 'app-manga-hero',
  standalone: true,
  imports: [],
  templateUrl: './manga-hero.component.html',
  styleUrl: './manga-hero.component.scss'
})
export class MangaHeroComponent {
  @Input() 
  manga:MangaHero=new MangaHero("","","","",0,"","","");
  
}
