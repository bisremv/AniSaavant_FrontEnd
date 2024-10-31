import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { MangaItemComponent } from "../manga-item/manga-item.component";
import { NextCarouselComponent } from "../anime-grouping/next-carousel/next-carousel.component";
import { Arrow } from '../anime-grouping/next-carousel/arrow';
import { CommonModule } from '@angular/common';
import { MangaItem } from '../../Models/MangaItem';
import { Extension } from '../../Models/Extenison';
import { Router } from '@angular/router';
import { EmptyPageComponent } from "../empty-page/empty-page.component";
@Component({
  selector: 'app-manga-group',
  standalone: true,
  imports: [MangaItemComponent, NextCarouselComponent, CommonModule, EmptyPageComponent],
  templateUrl: './manga-group.component.html',
  styleUrl: './manga-group.component.scss'
})
export class MangaGroupComponent implements OnInit {

  @Input() mangaList:MangaItem[]= [];
  @Input() extObj:Extension=new Extension(0,"","","");
  ext:number=0;
  router:Router=inject(Router);
  @Input() ListName:string|undefined;
  next:number =Arrow.Next;
  prev:number =Arrow.Prev;
  isLoading:boolean=false;
  @ViewChild('carousel') carousel!: ElementRef;
  
  showNextArrow: boolean = true;
  showPrevArrow: boolean = false;
ListIsEmpty: any;
  ngOnInit(){
    this.ext=this.extObj.exId
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
  
  navigateToExtensionPage() {
    let group=''
    if(this.ListName=="Popular Manga"){
      group="Popular"
    }
    else if(this.ListName=="Latest Manga"){
      group="Latest"
    }
    this.router.navigate(['/extension/page'], { queryParams: { group: group ,extId:this.ext} });
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
  

}
