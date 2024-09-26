import { Component, Input } from '@angular/core';
import { MangaItemComponent } from "../manga-item/manga-item.component";
import { NextCarouselComponent } from "../anime-grouping/next-carousel/next-carousel.component";
import { Arrow } from '../anime-grouping/next-carousel/arrow';
import { CommonModule } from '@angular/common';
import { MangaItem } from '../../Models/MangaItem';
@Component({
  selector: 'app-manga-group',
  standalone: true,
  imports: [MangaItemComponent, NextCarouselComponent , CommonModule],
  templateUrl: './manga-group.component.html',
  styleUrl: './manga-group.component.scss'
})
export class MangaGroupComponent {
  @Input()
  mangaList:MangaItem[] | undefined;
  @Input()
  ListName:string|undefined;
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
  
  // todo use render here to reference the element in the DOM the above wont work with multiple manga group
onDirectionScroll(direction: number): void {
  const carousel = document.querySelector('.carousel-manga-inner');
  if (carousel) {
    const scrollAmount = carousel.clientWidth; // Scroll by the width of the container
    const newScrollPosition = carousel.scrollLeft + direction * scrollAmount;
    
    carousel.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth' // Smooth scrolling
    });}
}


}
