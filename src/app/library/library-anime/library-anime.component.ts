import { Component, inject } from '@angular/core';
import { LibraryService } from '../../Service/library.service';
import { animeItem } from '../../Models/animeItem';
import { FormsModule } from '@angular/forms';
import { SearchItemComponent } from '../../Components/search-item/search-item.component';
import { CommonModule } from '@angular/common';
import { EmptyPageComponent } from "../../Components/empty-page/empty-page.component";

@Component({
  selector: 'app-library-anime',
  standalone: true,
  imports: [CommonModule, SearchItemComponent, FormsModule, EmptyPageComponent],
  templateUrl: './library-anime.component.html',
  styleUrl: './library-anime.component.scss'
})
export class LibraryAnimeComponent {
  libService:LibraryService=inject(LibraryService)
  animeList:animeItem[]=[]
  activeTab:Tab=Tab.All
  filterList:animeItem[]=[]
  isLoading=false
  ngOnInit(): void {
    this.isLoading=true
    this.libService.getAllAnimeInLibrary().subscribe({
      next:(res)=>{
        this.animeList=res as animeItem[]
        this.filterList=this.animeList
      },
      error:(err)=>{
        this.isLoading=false
      },
      complete:()=>{
        this.isLoading=false
      }
    })
  }
  filterAnime(tab:Tab){
    if(tab==Tab.All){
      this.filterList=this.animeList
    }
    else{
      this.filterList=this.animeList.filter((item)=> (item.status == tab))
    }  
  }

  
  setActiveTab(tab: Tab) {
    this.activeTab = tab;
    this.filterAnime(tab)
  }
  get Tab() {
    return Tab;
  }

  onAnimeDelete(animeId: number) {
    this.filterList=this.filterList.filter((item)=>(item.animeId!=animeId))
  }
  

}

enum Tab {
  All = 'All',
  OnGoing = 'Returning Series',
  Planned = 'Planned',
  Canceled = 'Canceled',
  Ended = 'Ended'
}