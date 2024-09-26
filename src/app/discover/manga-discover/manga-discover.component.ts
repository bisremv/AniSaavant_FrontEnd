import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MangaItemComponent } from "../../Components/manga-item/manga-item.component";
import { MangaGroupComponent } from "../../Components/manga-group/manga-group.component";
import { MangaSitesComponent } from "./manga-sites/manga-sites.component";
import { MangaHeroComponent } from "./manga-hero/manga-hero.component";
import { DiscoverService } from '../../Service/discover.service';
import { MangaHero } from '../../Models/MangaHero';
import { ExtensionService } from '../../Service/extension.service';
import { Extension } from '../../Models/Extenison';


@Component({
  selector: 'app-manga-discover',
  standalone: true,
  imports: [MangaItemComponent, MangaGroupComponent, MangaSitesComponent, MangaHeroComponent ,CommonModule],
  templateUrl: './manga-discover.component.html',
  styleUrl: './manga-discover.component.scss'
})
export class MangaDiscoverComponent implements OnInit {
  @ViewChild('carousel') carousel!: ElementRef;
  Extension:ExtensionService=inject(ExtensionService)
  Discover:DiscoverService=inject(DiscoverService);
  ngOnInit() {
    this.getMangaHeros();
    this.getExternalMangaSites();
  }
  
  // todo use render here
  // Scroll to the next item in the carousel
  scrollNext() {
    const carousel: HTMLElement = this.carousel.nativeElement;
    const scrollAmount = carousel.clientWidth;
    const currentScroll = carousel.scrollLeft;
    const maxScroll = scrollAmount * (this.mangaHeros.length - 1); // Total width minus the width of one item
    
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
      const maxScroll = scrollAmount * (this.mangaHeros.length - 1);
      carousel.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else {
      // Otherwise, scroll by one item width in the reverse direction
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }
  
  
  
  
  // todo change with service by geting manga
  extInfo:Extension[]=[];
  mangaHeros:MangaHero[] = []
  
  getMangaHeros() {
    this.Discover.getMangaList().subscribe(
      {
        next: (res) => {
          console.log(res);
          this.mangaHeros = (res as MangaHero[]);
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          console.log(' manga hero complete');
        }
      })
  }
  getExternalMangaSites() {
    this.Extension.getExtensionList().subscribe({
      next:(extList)=>{
        this.extInfo=(extList as Extension[]);
      },
      error:(error)=>{
        console.log(error);
      },
      complete:()=>{
        console.log(' list complete');
      }
    })
  }
}
