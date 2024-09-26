import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeItemHorizontalComponent } from "../anime-item-horizontal/anime-item-horizontal.component";
import { animeItem } from '../../Models/animeItem';

@Component({
  selector: 'app-anime-group-horizontal',
  standalone: true,
  imports: [AnimeItemHorizontalComponent,CommonModule],
  templateUrl: './anime-group-horizontal.component.html',
  styleUrl: './anime-group-horizontal.component.scss'
})
export class AnimeGroupHorizontalComponent {
@Input()
animeList:animeItem[]|undefined;
@Input()
animeGroup:string="anime group"

}
