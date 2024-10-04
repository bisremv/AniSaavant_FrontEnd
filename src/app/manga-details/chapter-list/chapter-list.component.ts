import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MangaService } from '../../Service/manga.service';
import { Chapter } from '../../Models/chapters';

@Component({
  selector: 'app-chapter-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chapter-list.component.html',
  styleUrl: './chapter-list.component.scss'
})
export class ChapterListComponent implements OnInit {
  @Input() extId:number=0;
  @Input() itemLink:string="";
  mangaService:MangaService=inject(MangaService);
  chapters:Chapter[]=[];
  ngOnInit(): void {
    this.getChapters();
  }
  getChapters(){
    this.mangaService.getChapters(this.itemLink, this.extId).subscribe({
      next:(res)=>{
        this.chapters = res;
        console.log(this.chapters);
      }
    });
  }
}
