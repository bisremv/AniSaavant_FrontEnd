import { Component, ElementRef, inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnimeHeroComponent } from "./anime-hero/anime-hero.component";
import { CommonModule } from '@angular/common';
import { AnimeGroupingComponent } from "../../Components/anime-grouping/anime-grouping.component";
import { AnimeGroupHorizontalComponent } from "../../Components/anime-group-horizontal/anime-group-horizontal.component";
import { DiscoverService } from '../../Service/discover.service';
import { animeItem } from '../../Models/animeItem';
import { AnimeHero } from '../../Models/anime_hero';
import { title } from 'process';
import { iif } from 'rxjs';
@Component({
  selector: 'app-anime-discover',
  standalone: true,
  imports: [AnimeHeroComponent, CommonModule, AnimeGroupingComponent, AnimeGroupHorizontalComponent],
  templateUrl: './anime-discover.component.html',
  styleUrl: './anime-discover.component.scss'
})
export class AnimeDiscoverComponent implements OnInit,OnDestroy {
  private intervalId: any;
  @ViewChild('carousel') carousel!: ElementRef;
  discover:DiscoverService = inject(DiscoverService);
  animeHeros: AnimeHero[] = []
  PopularList=[]
  TrendingList=[]
  AnticipatedList=[]
  MostWatchedList=[]
  activeIndex = 0;

  

// Other lists and initialization code...
jumpToSlide(index: number) {
    const carousel: HTMLElement = this.carousel.nativeElement;
    const scrollAmount = carousel.clientWidth * index;
    carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    this.activeIndex = index; // Update active index
  }

// Scroll to the next item in the carousel
scrollNext() {
  const carousel: HTMLElement = this.carousel.nativeElement;
  const scrollAmount = carousel.clientWidth;
  const currentScroll = carousel.scrollLeft;
  const maxScroll = scrollAmount * (this.animeHeros.length - 1);

  if (currentScroll + scrollAmount >= maxScroll) {
    carousel.scrollTo({ left: 0, behavior: 'smooth' });
    this.activeIndex = 0; // Loop back to the first slide
  } else {
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    this.activeIndex = Math.min(this.activeIndex + 1, this.animeHeros.length - 1); // Update active slide index
  }
}

scrollPrev() {
  const carousel: HTMLElement = this.carousel.nativeElement;
  const scrollAmount = carousel.clientWidth;
  const currentScroll = carousel.scrollLeft;

  if (currentScroll - scrollAmount < 0) {
    const maxScroll = scrollAmount * (this.animeHeros.length - 1);
    carousel.scrollTo({ left: maxScroll, behavior: 'smooth' });
    this.activeIndex = this.animeHeros.length - 1; // Loop forward to the last slide
  } else {
    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    this.activeIndex = Math.max(this.activeIndex - 1, 0); // Update active slide index
  }
}

  ngOnInit() {
      this.getAnimeHero();
      this.getPopularAnime();
      this.getAnimeTrending();
      this.getAnticipated();
      this.getMostWatched();
      this.getPopularAnime();
      this.intervalId = setInterval(() => {
        this.scrollNext();
      }, 10000);
    }
  getAnimeHero(){
    this.discover.getAnimeHero(1).subscribe({
      next:(heroList)=>{
        // map the heroList to the hero array map each property for every loop
        this.animeHeros = heroList.map((heroItem :any) => ({
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
        console.error('Error fetching hero list:', err);
      }
    });
  }
  getPopularAnime(){
    this.discover.getPopularAnime(1).subscribe({
      next:(PopularList)=>{
        this.PopularList = PopularList;
        this.PopularList = PopularList.map((anticipatedItem :any) => ({
          animeId: anticipatedItem.ids.trakt,        // Mapping animeId (or use `id` if not available)
          tmdbId: anticipatedItem.ids.tmdb,          // Mapping tmdbId
          title: anticipatedItem.title,  
        }));
      }
  });

  }
  getMostWatched(){
    this.discover.getMostWatchedAnime(1).subscribe({
      next:(MostWatchedList)=>{
        this.MostWatchedList= MostWatchedList;
        this.MostWatchedList= MostWatchedList.map((anticipatedItem :any) => ({
          animeId: anticipatedItem.ids.trakt,        // Mapping animeId (or use `id` if not available)
          tmdbId: anticipatedItem.ids.tmdb,          // Mapping tmdbId
          title: anticipatedItem.title,  
        }));
      }
  });

  }
  getAnimeTrending(){
    this.discover.getAnimeTrending(1).subscribe({
        next:(trendingList)=>{
          this.TrendingList = trendingList;
          this.TrendingList= trendingList.map((trendingItem :any) => ({
          animeId: trendingItem.ids.trakt,        // Mapping animeId (or use `id` if not available)
          tmdbId: trendingItem.ids.tmdb,          // Mapping tmdbId
          title: trendingItem.title,    
        }));
        // this.AnticipatedList= trendingList.map((trendingItem :any) => ({
        //   animeId: trendingItem.ids.trakt,        // Mapping animeId (or use `id` if not available)
        //   tmdbId: trendingItem.ids.tmdb,          // Mapping tmdbId
        //   title: trendingItem.title,    
        // }));
      }
    }
    );
  }
  getAnticipated(){
    this.discover.getAnticipatedAnime(1).subscribe({
      next:(anticipatedList)=>{
        this.AnticipatedList= anticipatedList;
        this.AnticipatedList= anticipatedList.map((anticipatedItem :any) => ({
          animeId: anticipatedItem.ids.trakt,        // Mapping animeId (or use `id` if not available)
          tmdbId: anticipatedItem.ids.tmdb,          // Mapping tmdbId
          title: anticipatedItem.title,  
        }));
      }
  });

  }
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
