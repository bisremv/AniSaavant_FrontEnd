import { Component, Input } from '@angular/core';
import { Season } from '../../Models/season';
import { SeasonItemComponent } from "./season-item/season-item.component";
import { CommonModule } from '@angular/common';
import { Arrow } from '../../Components/anime-grouping/next-carousel/arrow';
import { NextCarouselComponent } from "../../Components/anime-grouping/next-carousel/next-carousel.component";

@Component({
  selector: 'app-season-carousel',
  standalone: true,
  imports: [SeasonItemComponent, CommonModule, NextCarouselComponent],
  templateUrl: './season-carousel.component.html',
  styleUrl: './season-carousel.component.scss'
})
export class SeasonCarouselComponent {
@Input()
seasons:Season[]= [];
@Input()
tmdbId:number=0;
@Input()
animeId:number=0;
next:number =Arrow.Next;
prev:number =Arrow.Prev;
@Input()   isAnimeLoading:boolean=false;
showNextArrow: boolean = true;
showPrevArrow: boolean = false;
displayCount = 6;  // Initial number of items to display
  incrementCount = 6; // Number of items to load each time

  loadMore() {
    if (this.displayCount < this.seasons.length) {
      this.displayCount += this.incrementCount;
    }
  }
  get allItemsLoaded(): boolean {
    return this.displayCount >= this.seasons.length;
  }
ngOnChanges(){
  if(this.seasons.length < 5){
    this.showNextArrow=false;
  }
  else{
    this.showNextArrow=true;
  }

}

onScroll(event: any): void {
  const element = event.target;
  const maxScrollLeft = element.scrollWidth - element.clientWidth;

  // Check if the user has scrolled to the far left
  if (element.scrollLeft === 0) {
    this.showPrevArrow = false;
  } else {
    this.showPrevArrow = true;
  }

  // Check if the user has scrolled to the far right
  if (element.scrollLeft >= maxScrollLeft-5) {
    this.showNextArrow = false;
  } else {
    this.showNextArrow = true;
  }
}

onDirectionScroll(direction: number): void {
  const carousel = document.querySelector('.season-carousel');
  if (carousel) {
    const scrollAmount = carousel.clientWidth; // Scroll by the width of the container
    const newScrollPosition = carousel.scrollLeft + direction * scrollAmount;
    
    carousel.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth' // Smooth scrolling
    });}
}
}
