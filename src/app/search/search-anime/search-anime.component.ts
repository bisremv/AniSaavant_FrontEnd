import { Component, inject } from '@angular/core';
import { FilterComponent } from "./filter/filter.component";
import { AnimeService } from '../../Service/anime.service';
import { Filter } from '../../Models/SearchFilter';
import { error } from 'console';
import { animeItem } from '../../Models/animeItem';
import { AnimeItemComponent } from "../../Components/anime-item/anime-item.component";
import { CommonModule } from '@angular/common';
import { SearchItemComponent } from "../../Components/search-item/search-item.component";

@Component({
  selector: 'app-search-anime',
  standalone: true,
  imports: [FilterComponent, AnimeItemComponent, CommonModule, SearchItemComponent],
  templateUrl: './search-anime.component.html',
  styleUrl: './search-anime.component.scss'
})
export class SearchAnimeComponent {
  
  Search:AnimeService=inject(AnimeService);
  searchList=[]
  appliedFilters: any;
  // Method to receive the filter options from the child
  onFiltersApplied(filters: Filter) {
    this.appliedFilters = filters;
    // You can now use the filters to update your view or make API requests
        console.log('Filters received:', filters);
        this.Search.searchAnime(filters).subscribe({
          next: (data) => {
            this.searchList = data.map((anticipatedItem :any) => ({
              animeId: anticipatedItem.ids.trakt,        // Mapping animeId (or use `id` if not available)
              tmdbId: anticipatedItem.ids.tmdb,          // Mapping tmdbId
              title: anticipatedItem.title,}));
            console.log('Search list:', this.searchList);
          },
          error: (error) => {
            console.error(error);
          }});
  }



}
