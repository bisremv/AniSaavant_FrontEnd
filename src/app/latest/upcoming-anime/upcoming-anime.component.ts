import { Component, inject, OnInit } from '@angular/core';
import { LatestAnimeItemComponent } from "../latest-anime-item/latest-anime-item.component";
import { CommonModule } from '@angular/common';
import { DiscoverService } from '../../Service/discover.service';
import { UpcomingEpisode } from '../../Models/upcomingEpisode';
import { EmptyPageComponent } from "../../Components/empty-page/empty-page.component";

@Component({
  selector: 'app-upcoming-anime',
  standalone: true,
  imports: [CommonModule, LatestAnimeItemComponent, EmptyPageComponent],
  templateUrl: './upcoming-anime.component.html',
  styleUrl: './upcoming-anime.component.scss'
})
export class UpcomingAnimeComponent  implements OnInit {
  upcomingEpisode:UpcomingEpisode[]=[]
  isLoading:boolean=false;
  discover:DiscoverService=inject(DiscoverService);
  getUpcomingAnime() {
    this.isLoading = true;
    this.discover.getUpcomingAnime().subscribe({
        next: (res) => {

            // Convert response to UpcomingEpisode instances, ensuring first_aired is a Date object
            this.upcomingEpisode = (res as UpcomingEpisode[]).map((ep: any) => new UpcomingEpisode(
                ep.season,
                ep.number,
                ep.title,
                ep.runtime,
                new Date(ep.first_aired), // Convert to Date
                ep.animeId,
                ep.tmdbId
            ));
            
            // Sort the episodes by first_aired date
            this.upcomingEpisode.sort((a, b) => {
                return a.first_aired.getTime() - b.first_aired.getTime(); // Compare dates
            });
        },
        error: (err) => {
          this.isLoading = false;
        },
        complete: () => {
            this.isLoading = false;
    }});
}

  ngOnInit(): void {
    this.getUpcomingAnime()
  }
  get Order() {
    return Order;
  }
}
enum Order{
  First='first',
  Mid='middle',
  Last='last'
}