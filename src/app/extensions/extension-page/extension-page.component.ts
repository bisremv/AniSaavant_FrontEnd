import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { LatestComponent } from "./latest/latest.component";
import { Extension } from '../../Models/Extenison';
import { ActivatedRoute } from '@angular/router';
import { ExtensionService } from '../../Service/extension.service';
import { MangaItem } from '../../Models/MangaItem';
import { DiscoverService } from '../../Service/discover.service';
import { SearchService } from '../../Service/search.service';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-extension-page',
  standalone: true,
  imports: [CommonModule, LatestComponent , FormsModule],
  templateUrl: './extension-page.component.html',
  styleUrl: './extension-page.component.scss'
})
export class ExtensionPageComponent implements OnInit {


  ext:Extension=new Extension(0,"","","")
  extId:number=0;
  pageNumber = new BehaviorSubject<number>(1);  // Initialize with default page number
  // pageNumber:number=1;
  activeTab: Tab = Tab.Search; // Set default tab to Search
  mangaList:MangaItem[]=[]
  searchQuery:string=""
  activeRoute:ActivatedRoute=inject(ActivatedRoute)
  extension:ExtensionService=inject(ExtensionService)
  discover:DiscoverService=inject(DiscoverService)
  search:SearchService=inject(SearchService)
  getTab=''
  isLoading:boolean=false
  setActiveTab(tab: Tab) {
    this.activeTab = tab;
    this.mangaList=[]
    this.pageNumber.next(1)
    if(tab == Tab.Latest){
      this.getLatest(1)
    }
    else if(tab == Tab.Popular){
      this.getPopular(1)
    }
    else if(tab == Tab.Search){
    this.getSearch()
    }
  }
  changePage(next:boolean){
    if(!next && this.pageNumber.value>1){
      this.getMangaList(this.activeTab,this.pageNumber.value-1);
    }
    else if(next){
      this.getMangaList(this.activeTab,this.pageNumber.value+1);
    }
  }
getMangaList(activeTab: Tab, pageNum: number) {
    if(activeTab == Tab.Latest){
      this.getLatest(pageNum);}
    else if(activeTab == Tab.Popular){
      this.getPopular(pageNum);}
  }


ngOnInit(): void {
  this.activeRoute.queryParams.subscribe(params => {
    this.extId = params['extId'];
    this.getTab=params['group']
    this.extension.getExtensionById(this.extId).subscribe({
      next:(res)=>{
        this.ext=res as Extension;
        if(this.getTab.includes(Tab.Latest)){
          this.activeTab=Tab.Latest
          this.getLatest(1)
        }
        else if(this.getTab.includes(Tab.Popular)){
          this.activeTab=Tab.Popular
          this.getPopular(1)
        }
      }
    })
  })

}

getLatest(page:number){
  this.isLoading=true
  this.discover.getLatestManga(this.ext.exId,page).subscribe({
    next:(latest)=>{
      this.mangaList=(latest as MangaItem[]);
    },
    error:(error)=>{
      this.isLoading=false
    },
    complete:()=>{
      this.isLoading=false
      this.pageNumber.next(page);

    }
  })
}
getPopular(page:number){
  this.isLoading=true
  this.discover.getPopularManga(this.ext.exId,page).subscribe({
    next:(popular)=>{
      this.mangaList=(popular as MangaItem[]);
    }
    ,
    error:(error)=>{
      this.isLoading=false
    },
    complete:()=>{
      this.pageNumber.next(page);
      this.isLoading=false

    }
  })
}
getSearch(){
  this.isLoading=true
  this.search.searchManga(this.searchQuery , this.ext.exId).subscribe({
    next: (res) => {
      this.mangaList = res as MangaItem[];
      console.log(this.mangaList)
    },
    error:(error)=>{
      this.isLoading=false
    },
    complete:()=>{
    }  
  });
}


get Tab() {
  return Tab;
}
}


enum Tab {
  Search = 'Search',
  Popular = 'Popular',
  Latest = 'Latest'
}