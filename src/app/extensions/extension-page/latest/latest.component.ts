import { Component, Input } from '@angular/core';
import { MangaGridItemComponent } from "../../../Components/manga-grid-item/manga-grid-item.component";
import { Extension } from '../../../Models/Extenison';
import { MangaItem } from '../../../Models/MangaItem';
import { CommonModule } from '@angular/common';
import { EmptyPageComponent } from "../../../Components/empty-page/empty-page.component";

@Component({
  selector: 'app-latest',
  standalone: true,
  imports: [MangaGridItemComponent, CommonModule, EmptyPageComponent],
  templateUrl: './latest.component.html',
  styleUrl: './latest.component.scss'
})
export class LatestComponent {
  @Input() mangaList:MangaItem[]=[]
  @Input() isLoading:boolean=false
}
