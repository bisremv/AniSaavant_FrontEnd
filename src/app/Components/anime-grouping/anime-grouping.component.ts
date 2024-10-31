import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeItemComponent } from '../anime-item/anime-item.component';
import { NextCarouselComponent } from "./next-carousel/next-carousel.component";
import { Arrow } from './next-carousel/arrow';
import { animeItem } from '../../Models/animeItem';
import { Router } from '@angular/router';


@Component({
  selector: 'app-anime-grouping',
  standalone: true,
  imports: [AnimeItemComponent, CommonModule, NextCarouselComponent],
  templateUrl: './anime-grouping.component.html',
  styleUrl: './anime-grouping.component.scss'
})
export class AnimeGroupingComponent {
  @ViewChild('carousel') carousel!: ElementRef;
  @Input() animeList!: animeItem[];
  @Input() animeGroup:string="anime group"
  next:number =Arrow.Next;
  prev:number =Arrow.Prev;
  router:Router=inject(Router)
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


onDirectionScroll(direction: number): void {
  const carouselElement = this.carousel.nativeElement;
  const scrollAmount = carouselElement.clientWidth; // Scroll by the width of the container
  const newScrollPosition = carouselElement.scrollLeft + direction * scrollAmount;

  carouselElement.scrollTo({
    left: newScrollPosition,
    behavior: 'smooth' // Smooth scrolling
  });
}


navigateToExplore(){
  this.router.navigate(['/explore'],{queryParams:{explore:this.animeGroup}})
}
}

