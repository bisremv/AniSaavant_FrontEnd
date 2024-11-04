import { Component, inject } from '@angular/core';
import { AnimeHero } from '../Models/anime_hero';
import { DiscoverService } from '../Service/discover.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SearchItemComponent } from "../Components/search-item/search-item.component";
import { EmptyPageComponent } from "../Components/empty-page/empty-page.component";

@Component({
  selector: 'app-explore-anime',
  standalone: true,
  imports: [CommonModule, SearchItemComponent, EmptyPageComponent],
  templateUrl: './explore-anime.component.html',
  styleUrl: './explore-anime.component.scss'
})
export class ExploreAnimeComponent {
  discover:DiscoverService = inject(DiscoverService);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  activeTab: Tab = Tab.Trending;
  isLoading:boolean=false;
  AirTodayList= []
  PopularList=[]
  TrendingList=[]
  AnticipatedList=[]
  MostWatchedList=[]
  page:number=1;
getCurrentListIsEmpty(){
  if(this.activeTab == Tab.AiringToday){
    return this.AirTodayList.length==0;
  }
  else if(this.activeTab == Tab.Popular){
    return this.PopularList.length==0;
  }
  else if(this.activeTab == Tab.Trending){
    return this.TrendingList.length==0;
  }
  else if(this.activeTab == Tab.Anticipated){
    return this.AnticipatedList.length==0;
  }
  else if(this.activeTab == Tab.MostWatched){
    return this.MostWatchedList.length==0;
  }
  return false;
}

ngOnInit() {
  this.activeRoute.queryParams.subscribe(params => {
    this.activeTab=params['explore'];
    this.getAnimeList(this.activeTab,1)
  })
  }

getAnimeList(activate:Tab,pageNum:number){
    if(activate == Tab.AiringToday){
      this.getAiringTOday(pageNum);}
    else if(activate == Tab.Popular){
      this.getPopularAnime(pageNum);}
    else if(activate == Tab.Trending){
      this.getAnimeTrending(pageNum);}
    else if(activate == Tab.Anticipated){
      this.getAnticipated(pageNum);}
    else if(activate == Tab.MostWatched){
      this.getMostWatched(pageNum);}
    else{
      this.getAnimeTrending(pageNum);
    }
  }
changeTab(changeTab: Tab) {  
      this.activeTab=changeTab;
    this.getAnimeList(this.activeTab,1);
    }
getAiringTOday(pageNum:number){
  this.isLoading=true
  this.discover.getAnimeHero(pageNum).subscribe({
    next:(heroList)=>{
            // map the heroList to the hero array map each property for every loop
      this.AirTodayList = heroList.map((heroItem :any) => ({
        animeId: heroItem.animeId,        // Mapping animeId (or use `id` if not available)
        tmdbId: heroItem.tmdbId,          // Mapping tmdbId
        title: heroItem.name,                             // Mapping name
        type: heroItem.type || 'Anime',                  // Mapping type, with default 'Anime'
        description: heroItem.overview,                     // Mapping overview
        image: heroItem.backdropPath || heroItem.backdrop_path, // Mapping backdropPath
        rating: heroItem.voteAverage || heroItem.vote_average,    // Mapping voteAverage
        votes: heroItem.voteCount || heroItem.vote_count,          // Mapping voteCount
        date: heroItem.firstAirDate || heroItem.first_air_date // Mapping firstAirDate
      }));
    },
    error: (err) => {
      this.isLoading=false
      console.error('Error fetching hero list:', err);
    },
    complete: () => {
      this.isLoading=false
      this.page=pageNum;
    }
  });
}
getPopularAnime(pageNum:number){
  this.isLoading=true
  this.discover.getPopularAnime(pageNum).subscribe({
    next:(PopularList)=>{
      this.PopularList = PopularList;
      this.PopularList = PopularList.map((anticipatedItem :any) => ({
        animeId: anticipatedItem.ids.trakt,        // Mapping animeId (or use `id` if not available)
        tmdbId: anticipatedItem.ids.tmdb,          // Mapping tmdbId
        title: anticipatedItem.title,  
      }));
    },
    error: (err) => {
      this.isLoading=false
      console.error('Error fetching hero list:', err);
    },
    complete: () => {
      this.isLoading=false
      this.page=pageNum;
    }
});

}
getMostWatched(pageNum:number){
  this.isLoading=true
  this.discover.getMostWatchedAnime(pageNum).subscribe({
    next:(MostWatchedList)=>{
      this.MostWatchedList= MostWatchedList;
      this.MostWatchedList= MostWatchedList.map((anticipatedItem :any) => ({
        animeId: anticipatedItem.ids.trakt,        // Mapping animeId (or use `id` if not available)
        tmdbId: anticipatedItem.ids.tmdb,          // Mapping tmdbId
        title: anticipatedItem.title,  
      }));
    },
    error: (err) => {
      this.isLoading=false
      console.error('Error fetching hero list:', err);
    },
    complete: () => {
      this.isLoading=false
      this.page=pageNum;
    }
});

}
getAnimeTrending(pageNum:number){
  this.isLoading=true     
  this.discover.getAnimeTrending(pageNum).subscribe({
      next:(trendingList)=>{
        this.TrendingList = trendingList;
        this.TrendingList= trendingList.map((trendingItem :any) => ({
        animeId: trendingItem.ids.trakt,        // Mapping animeId (or use `id` if not available)
        tmdbId: trendingItem.ids.tmdb,          // Mapping tmdbId
        title: trendingItem.title,    
      }));
    },
    error: (err) => {
      this.isLoading=false
      console.error('Error fetching hero list:', err);
    },
    complete: () => {
      this.isLoading=false
      this.page=pageNum;
    }
  }
  );
}
getAnticipated(pageNum:number){
  this.isLoading=true
this.discover.getAnticipatedAnime(pageNum).subscribe({
  next:(anticipatedList)=>{  
    this.AnticipatedList= anticipatedList;
    this.AnticipatedList= anticipatedList.map((anticipatedItem :any) => ({
      animeId: anticipatedItem.ids.trakt,        // Mapping animeId (or use `id` if not available)
      tmdbId: anticipatedItem.ids.tmdb,          // Mapping tmdbId
      title: anticipatedItem.title,
    }));
  },
  error: (err) => { 
    this.isLoading=false
    console.error('Error fetching hero list:', err);
  },
  complete: () => {
    this.isLoading=false
      this.page=pageNum;
  }
});

}
changePage(next:boolean){
  if(!next && this.page>1){
    this.page--;
    this.getAnimeList(this.activeTab,this.page);
  }
  else if(next){
    this.page++;
    this.getAnimeList(this.activeTab,this.page);
  }
}

get Tap(){
  return Tab;
}
}
enum Tab {
  MostWatched = 'MostWatched',
  Popular = 'Popular',
  Trending = 'Trending',
  Anticipated = 'Anticipated',
  AiringToday = 'AiringToday'
}
