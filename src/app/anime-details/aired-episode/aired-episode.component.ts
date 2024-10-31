import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Episode } from '../../Models/episodes';
import { CommonModule } from '@angular/common';
import e from 'express';

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
  @Input() posterPath: string = "";
  imgError:boolean=false;
  isNearEdge = false;
  constructor(private el: ElementRef) {}

  ngOnInit(){
  }
  setPlaceholder(event: any) {
    if(this.backdropPath.includes("null") && this.posterPath.includes("null") ||this.backdropPath.length==0 && this.posterPath.length==0 ) {
      this.imgError=true;
      event.target.src= 'images/S_logo.svg';
    }
    else if(!this.backdropPath.includes("null")||this.backdropPath.length!=0) {
      this.imgError=false;
      event.target.src = this.backdropPath; // Path to your placeholder image
    }
    else{
      this.imgError=true;
      event.target.src = this.posterPath; // Path to your placeholder image
    }
  }
  getRating() {
  let rating=this.episode.voteAverage*10;
  return rating.toFixed(1);
  }  
  getStyleRating() {
    return "--value:"+(this.episode.voteAverage * 10)+";"
  }
}
