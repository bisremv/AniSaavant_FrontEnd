import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MangaItemComponent } from "../../Components/manga-item/manga-item.component";
import { MangaGroupComponent } from "../../Components/manga-group/manga-group.component";
import { MangaSitesComponent } from "./manga-sites/manga-sites.component";
import { MangaHeroComponent } from "./manga-hero/manga-hero.component";
import { DiscoverService } from '../../Service/discover.service';
import { MangaHero } from '../../Models/MangaHero';
import { ExtensionService } from '../../Service/extension.service';
import { Extension } from '../../Models/Extenison';
import { MangaItem } from '../../Models/MangaItem';
import { EmptyPageComponent } from "../../Components/empty-page/empty-page.component";
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-manga-discover',
  standalone: true,
  imports: [MangaItemComponent, MangaGroupComponent, MangaSitesComponent, MangaHeroComponent, CommonModule, EmptyPageComponent,RouterModule],
  templateUrl: './manga-discover.component.html',
  styleUrl: './manga-discover.component.scss'
})
export class MangaDiscoverComponent implements OnInit , OnDestroy{
  @ViewChild('carousel') carousel!: ElementRef;
  Extension:ExtensionService=inject(ExtensionService)
  Discover:DiscoverService=inject(DiscoverService);
  extInfo:Extension[]=[];
  extLoading:Boolean=false;
  private intervalId: any;

  mangaHeros:MangaItem[] = []
  activeIndex = 0;  // Initialize active slide index
  // Other lists and initialization code...
  jumpToSlide(index: number) {
    const carousel: HTMLElement = this.carousel.nativeElement;
    const scrollAmount = carousel.clientWidth * index;
    carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    this.activeIndex = index; // Update active index
  }
  
  ngOnInit() {
    this.getMangaHeros();
    this.getExternalMangaSites();
    this.intervalId = setInterval(() => {
      this.scrollNext();
    }, 10000);
  }
  
  // Scroll to the next item in the carousel
  scrollNext() {
    const carousel: HTMLElement = this.carousel.nativeElement;
    const scrollAmount = carousel.clientWidth;
    const currentScroll = carousel.scrollLeft;
    const maxScroll = scrollAmount * (5); // Total width minus the width of one item
    
    if (currentScroll + scrollAmount >= maxScroll) {
      // If reached the end, loop back to the first item
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      // Otherwise, scroll by one item width
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
  
  scrollPrev() {
    const carousel: HTMLElement = this.carousel.nativeElement;
    const scrollAmount = carousel.clientWidth;
    const currentScroll = carousel.scrollLeft;
    
    if (currentScroll - scrollAmount < 0) {
      // If reached the beginning, loop forward to the last item
      const maxScroll = scrollAmount * (5);
      carousel.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else {
      // Otherwise, scroll by one item width in the reverse direction
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }
  
  // todo change with service by geting manga
  
  getMangaHeros() {
    this.Discover.getMangaList().subscribe(
      {
        next: (res) => {
          console.log("ss",res)
          this.mangaHeros = (res as MangaItem[]);
          console.log("as",this.mangaHeros)

        },
        error: (error: any) => {
        },
        complete: () => {
        }
      })
  }
  getExternalMangaSites() {
    
    this.extLoading=true;
    this.Extension.getExtension().subscribe({
      next:(extList)=>{

        this.extInfo=(extList as Extension[]);
      },
      error:(error)=>{
        this.extLoading=false;
      },
      complete:()=>{

        this.extLoading=false;
      }
    })
  }
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
