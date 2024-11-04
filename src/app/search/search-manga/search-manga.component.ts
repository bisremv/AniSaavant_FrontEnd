import { Component, inject, OnInit } from '@angular/core';
import { SearchService } from '../../Service/search.service';
import { FormsModule } from '@angular/forms';
import { ExtensionService } from '../../Service/extension.service';
import { Extension } from '../../Models/Extenison';
import { MangaItem } from '../../Models/MangaItem';
import { MangaSearchResult } from '../../Models/mangaSerachResult';
import { MangaGroupComponent } from "../../Components/manga-group/manga-group.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-manga',
  standalone: true,
  imports: [FormsModule, MangaGroupComponent,CommonModule],
  templateUrl: './search-manga.component.html',
  styleUrl: './search-manga.component.scss'
})
export class SearchMangaComponent implements OnInit {
  searchQuery: string = '';
  search:SearchService=inject(SearchService);
  extension:ExtensionService=inject(ExtensionService);
  extensionList: Extension[] = [];
  results: MangaSearchResult[] = [];
  extensionActiveButNOValueGot:Extension[]=[];
  ngOnInit(): void {
    this.extension.getExtension().subscribe({
      next: (data) => {
        this.extensionList = data as Extension[];
      },
      error: (error) => {
        console.error(error);
    }});
  }
  
  searchManga() {
    this.results = [];
    this.extensionActiveButNOValueGot=this.extensionList;
    for(let ext of this.extensionList){
    this.search.searchManga(this.searchQuery , ext.exId).subscribe({
      next: (res) => {
        let data = res as MangaItem[];
        this.results.push({ext: ext, result: data});
        
      },
      error: (error) => {
        
      }   ,
      complete:()=>{
        this.extensionActiveButNOValueGot = this.extensionActiveButNOValueGot.filter((e)=>e.exId!=ext.exId);
      }
    });
  }
}
}
