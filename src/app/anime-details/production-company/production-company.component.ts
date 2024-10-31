import { Component, Input } from '@angular/core';
import { Arrow } from '../../Components/anime-grouping/next-carousel/arrow';
import { CommonModule } from '@angular/common';
import { NextCarouselComponent } from "../../Components/anime-grouping/next-carousel/next-carousel.component";
import { StudioItemComponent } from "./studio-item/studio-item.component";
import { ProductionCompany } from '../../Models/ProductionCompany';

@Component({
  selector: 'app-production-company',
  standalone: true,
  imports: [CommonModule, NextCarouselComponent, StudioItemComponent],
  templateUrl: './production-company.component.html',
  styleUrl: './production-company.component.scss'
})
export class ProductionCompanyComponent {

  @Input() productionCompanies: ProductionCompany[] = [];

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
  ngOnChanges(){
    if(this.productionCompanies.length < 5){
      this.showNextArrow=false;
    }
    else{
      this.showNextArrow=true;
    }
  
  }
  onDirectionScroll(direction: number): void {
    const carousel = document.querySelector('.production-carousel');
    if (carousel) {
      const scrollAmount = carousel.clientWidth; // Scroll by the width of the container
      const newScrollPosition = carousel.scrollLeft + direction * scrollAmount;
      
      carousel.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth' // Smooth scrolling
      });}
  }
}
