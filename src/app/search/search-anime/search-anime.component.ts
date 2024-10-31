import { Component, inject } from '@angular/core';
import { FilterComponent } from "./filter/filter.component";
import { AnimeService } from '../../Service/anime.service';
import { Filter } from '../../Models/SearchFilter';
import { error } from 'console';
import { animeItem } from '../../Models/animeItem';
import { AnimeItemComponent } from "../../Components/anime-item/anime-item.component";
import { CommonModule } from '@angular/common';
import { SearchItemComponent } from "../../Components/search-item/search-item.component";
import { SearchService } from '../../Service/search.service';
import { EmptyPageComponent } from "../../Components/empty-page/empty-page.component";

@Component({
  selector: 'app-search-anime',
  standalone: true,
  imports: [FilterComponent, AnimeItemComponent, CommonModule, SearchItemComponent, EmptyPageComponent],
  templateUrl: './search-anime.component.html',
  styleUrl: './search-anime.component.scss'
})
export class SearchAnimeComponent {
  
  Search:SearchService=inject(SearchService);
  searchList=[]
  appliedFilters: any;
  isLoading:boolean=false;
  // Method to receive the filter options from the child
  onFiltersApplied(filters: Filter) {
    this.appliedFilters = filters;
    this.isLoading=true;
    // You can now use the filters to update your view or make API requests
        this.Search.searchAnime(filters).subscribe({
          next: (data) => {
            this.searchList = data.map((anticipatedItem :any) => ({
              animeId: anticipatedItem.ids.trakt,        // Mapping animeId (or use `id` if not available)
              tmdbId: anticipatedItem.ids.tmdb,          // Mapping tmdbId
              title: anticipatedItem.title,}));
          },
          error: (error) => {
            this.isLoading=false;
          },
        complete: () => {
          this.isLoading=false;
          
        }
        });
  }


}
