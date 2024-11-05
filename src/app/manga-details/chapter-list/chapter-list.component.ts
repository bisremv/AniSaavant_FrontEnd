import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MangaService } from '../../Service/manga.service';
import { Chapter } from '../../Models/chapters';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-chapter-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './chapter-list.component.html',
  styleUrl: './chapter-list.component.scss'
})
export class ChapterListComponent implements OnInit {
  @Input() extId:number=0;
  @Input() itemLink:string="";
  mangaService:MangaService=inject(MangaService);
  router:Router=inject(Router)
  chapterIsLoading:boolean=true;
  chapters:Chapter[]=[];
  ngOnInit(): void {
    this.getChapters();
  }
  getChapters(){
    this.chapterIsLoading = true;
    this.mangaService.getChapters(this.itemLink, this.extId).subscribe({
      next:(res)=>{
        this.chapters = res;
      },
      error:(error)=>{
        
    this.chapterIsLoading = false;
      }
      ,
      complete:()=>{
        this.chapterIsLoading = false;
      }
    });
  }

  getChapterTitle(title: string) {
    if(title == "N/A"){
      return ;
    }
    else{
      return title;
    }
  }

  navigateToPage(chapterLink:string) {
    this.router.navigate(['/manga/page'],{ queryParams: { chapterLink: chapterLink,itemLink: this.itemLink,extId:this.extId } }
    )
  }

}
