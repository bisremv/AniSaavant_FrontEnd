import { Component, inject, Input } from '@angular/core';
import { NextCarouselComponent } from "../../Components/anime-grouping/next-carousel/next-carousel.component";
import { Arrow } from '../../Components/anime-grouping/next-carousel/arrow';
import { VideoItemComponent } from "./video-item/video-item.component";
import { CommonModule } from '@angular/common';
import { AnimeService } from '../../Service/anime.service';
import { Videos } from '../../Models/VIdeos';
import { ImageItemComponent } from "./image-item/image-item.component";
import { Image } from '../../Models/image';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anime-videos',
  standalone: true,
  imports: [NextCarouselComponent, VideoItemComponent,CommonModule, ImageItemComponent],
  templateUrl: './anime-videos.component.html',
  styleUrl: './anime-videos.component.scss'
})
export class AnimeVideosComponent {
  @Input() tmdbId: number = 0;
  animeService:AnimeService=inject(AnimeService)
  activeRoute:ActivatedRoute=inject(ActivatedRoute)
  
  isVideoActive=true;
  isLogoActive=false;
  isPosterActive=false;
  isBackdropActive=false;
  trailerList:Videos[]= [];
  images: {posters: Image[], backdrops: Image[], logos: Image[] }={posters: [],backdrops: [],logos: []}
  
  ngOnInit(){
    this.activeRoute.queryParams.subscribe(params => {
      this.tmdbId = params['tmdbId'];
      this.getVideoList();
      this.getImageList();
      // Fetch the data or update the view with new params
    });  
    }
  
  changeActiveItem(active:string){
    if(active=="video"){
      this.isVideoActive=true;
      this.isLogoActive=false;
      this.isPosterActive=false;
      this.isBackdropActive=false;}
    else if(active=="logo"){
      this.isVideoActive=false;
      this.isLogoActive=true;
      this.isPosterActive=false;
      this.isBackdropActive=false;}
    
    else if(active=="poster"){
      this.isVideoActive=false;
      this.isLogoActive=false;
      this.isPosterActive=true;
      this.isBackdropActive=false;}
    else if(active=="backdrop"){
      this.isVideoActive=false;
      this.isLogoActive=false;
      this.isPosterActive=false;
      this.isBackdropActive=true;
    }
    this.resetScroll();
  }

  getVideoList(){
    this.animeService.getAnimeVideos(this.tmdbId).subscribe({
      next:(res)=>{
        console.log(res);
        this.trailerList = res
        console.log("this.trailer List");
        console.log(this.trailerList);
        console.log("this.trailer List");

      }
    })
  }
  getImageList(){
    this.animeService.getAnimeImages(this.tmdbId).subscribe({
      next:(res)=>{
        console.log(res);
        this.images = res

      console.log("this.image List");
      console.log(this.images);
      console.log("this.images List");

      }
    })
  }

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
  resetScroll(): void {
    const carousel = document.querySelector('.media-carousel');
    if (carousel) {
      carousel.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
  }
}
  // todo use render here to reference the element in the DOM the above wont work with multiple anime group
  onDirectionScroll(direction: number): void {
    const carousel = document.querySelector('.media-carousel');
    if (carousel) {
      const scrollAmount = carousel.clientWidth; // Scroll by the width of the container
      const newScrollPosition = carousel.scrollLeft + direction * scrollAmount;
      
      carousel.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth' // Smooth scrolling
      });}
  }
  
}
