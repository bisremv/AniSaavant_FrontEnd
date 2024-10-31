import { Component, Input } from '@angular/core';
import { AnimeInfo } from '../../Models/animeInfo';
import { Episode } from '../../Models/episodes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-anime-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anime-display.component.html',
  styleUrl: './anime-display.component.scss'
})
export class AnimeDisplayComponent {
@Input()  animeInfo: AnimeInfo = new AnimeInfo(
    0, 0, "", "", "", "", "", "", 0, false, "", "", 0, 0, "", "", "", "", 0, 0, [], [], [], [], 
    new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false),new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false));
  
}
