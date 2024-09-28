import { Component, Input, OnInit } from '@angular/core';
import { Episode } from '../../Models/episodes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aired-episode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aired-episode.component.html',
  styleUrl: './aired-episode.component.scss'
})
export class AiredEpisodeComponent implements OnInit {

  @Input()
  episode: Episode = new Episode(0, "", 0, "", "", "", 0, 0, "", 0, 0, 0, "", false);
  @Input() header: string = "";
  @Input() backdropPath: string = "";
  
  
  ngOnInit(){
  }
  setPlaceholder(event: any) {
    event.target.src = this.backdropPath; // Path to your placeholder image
  }
  getRating() {
  let rating=this.episode.voteAverage*10;
  return rating.toFixed(1);
  }  
}
