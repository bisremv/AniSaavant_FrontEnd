import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeItemComponent } from '../anime-item/anime-item.component';
import { NextCarouselComponent } from "./next-carousel/next-carousel.component";
import { Arrow } from './next-carousel/arrow';
import { animeItem } from '../../Models/animeItem';


@Component({
  selector: 'app-anime-grouping',
  standalone: true,
  imports: [AnimeItemComponent, CommonModule, NextCarouselComponent],
  templateUrl: './anime-grouping.component.html',
  styleUrl: './anime-grouping.component.scss'
})
export class AnimeGroupingComponent {
  @Input()
  animeList!: animeItem[];
  @Input()
  animeGroup:string="anime group"
next:number =Arrow.Next;
prev:number =Arrow.Prev;

showNextArrow: boolean = true;
showPrevArrow: boolean = false;

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

// todo use render here to reference the element in the DOM the above wont work with multiple anime group
onDirectionScroll(direction: number): void {
  const carousel = document.querySelector('.carousel-inner');
  if (carousel) {
    const scrollAmount = carousel.clientWidth; // Scroll by the width of the container
    const newScrollPosition = carousel.scrollLeft + direction * scrollAmount;
    
    carousel.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth' // Smooth scrolling
    });}
}

}

