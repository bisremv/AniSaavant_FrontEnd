import { Component, inject } from '@angular/core';
import { LatestMangaItemComponent } from "./latest-manga-item/latest-manga-item.component";
import { CommonModule } from '@angular/common';
import { MangaService } from '../../Service/manga.service';
import { latestChapter } from '../../Models/latestchapter';
import { EmptyPageComponent } from "../../Components/empty-page/empty-page.component";

@Component({
  selector: 'app-latest-manga',
  standalone: true,
  imports: [LatestMangaItemComponent, CommonModule, EmptyPageComponent],
  templateUrl: './latest-manga.component.html',
  styleUrl: './latest-manga.component.scss'
})
export class LatestMangaComponent {
  mangaList: latestChapter[] =[]
  isLoading:boolean=false;
  manga:MangaService=inject(MangaService)
ngOnInit(){
  this.getLatestMangaList()
}
  getLatestMangaList(){
    this.isLoading=true;
    this.manga.getLatestMangaList().subscribe({
        next:(res)=>{
          this.mangaList=(res as latestChapter[]).reverse();
        },
        error:(err)=>{
          this.isLoading=false;
        },
        complete:()=>{
          this.isLoading=false;
        }
  })}
}
