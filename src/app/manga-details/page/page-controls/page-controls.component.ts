import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { MangaService } from '../../../Service/manga.service';
import { Chapter } from '../../../Models/chapters';
import { Router } from '@angular/router';
import { ExtensionService } from '../../../Service/extension.service';
import { Extension } from '../../../Models/Extenison';
import { Page } from '../../../Models/pages';
import { NavBarPageHIdeService } from '../../../Service/nav-bar-page-hide.service';
import e from 'express';

@Component({
  selector: 'app-page-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-controls.component.html',
  styleUrl: './page-controls.component.scss'
})
export class PageControlsComponent {

  navControl:NavBarPageHIdeService=inject(NavBarPageHIdeService);
  @Input() itemLink:string=''
  @Input() chapterLink:string=''
  @Input() pages:Page[]=[];
  
  @Input() pageNumberView:number=0;
  mangaService:MangaService=inject(MangaService)
  extensionService:ExtensionService=inject(ExtensionService)
  router:Router=inject(Router)
  @Input() extId:number=0
  chapters:Chapter[]=[]
  extension:Extension=new Extension(0,"","","")
  currentChapter:Chapter=new Chapter(0,false,"","",0,"")
  isPageMenuOpen:boolean=false;
  isSideMenuOpen: boolean = false; // Controls sidenav visibility
  isChapterMenuOpen: boolean = false;
  elementRef: ElementRef = inject(ElementRef);
  @Output() navToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() sideToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() pageViewControl: EventEmitter<string> = new EventEmitter<string>();
  @Output() imageFitControl: EventEmitter<string> = new EventEmitter<string>();
  @Output() directionControl: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() progressControl: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() pageNumber: EventEmitter<number> = new EventEmitter<number>();
  currentProgress=true;
  currentPageView="single";
  currentImageFit="no"
  isRightToLeft:boolean=false;
  imageFitView='no Limit'
  openSideMenu() {
    this.isSideMenuOpen = true;
    this.sideToggle.emit(this.isSideMenuOpen);
  }
  
  closeSideMenu() {
    this.isSideMenuOpen = false;
    this.sideToggle.emit(this.isSideMenuOpen);
  }
  navbarToggle() {
    console.log(this.navControl.isOpen());
    if(this.navControl.isOpen()){
      this.navControl.closeNav();
      this.navToggle.emit(this.navControl.isOpen());
    }
    else{
      this.navControl.openNAv();
      this.navToggle.emit(this.navControl.isOpen());
    }
    }


  changePageView(){
    if(this.currentPageView=="single"){
      this.currentPageView="double";}
    else if(this.currentPageView=="double"){
      this.currentPageView="long Strip";
    }
    else if(this.currentPageView=="long Strip"){
      this.currentPageView="single";
    }
    else{
      this.currentPageView="single";
    }
    this.pageViewControl.emit(this.currentPageView);
  }
  changeImageFit(){
    if(this.currentImageFit=='h'){
      this.currentImageFit='both'
      this.imageFitView='both'
    }
    else if(this.currentImageFit=="w"){
      this.currentImageFit='h'
      this.imageFitView='height'
    }
    else if(this.currentImageFit=='both'){
      this.currentImageFit='no'
      this.imageFitView='none Limit'
    }
    else if(this.currentImageFit=='no'){
      this.currentImageFit='w'
      this.imageFitView='width'
    }
    else{
      this.currentImageFit='w'
      this.imageFitView='width'
    }
    this.imageFitControl.emit(this.currentImageFit);
  }
  changePage(pageNumber: number) {
    if (pageNumber >= 0 && pageNumber <= this.pages.length) {
    this.pageNumber.emit(pageNumber);
  }
  }

  changeChapter(directionControl: string) {
    const currentIndex = this.chapters.findIndex(
      item => item.ChapterLink === this.currentChapter.ChapterLink
    );
  
    if (currentIndex !== -1) {
      let newIndex = currentIndex;
  
      if (directionControl === 'prev' && currentIndex < this.chapters.length - 1) {
        // this is because the index ad the array are reversed
        newIndex = currentIndex + 1;
      } else if (directionControl === 'next' && currentIndex > 0) {
        // this is because the index ad the array are reversed
        newIndex = currentIndex - 1;
      }
  
      // Only update if there's an actual change
      if (newIndex !== currentIndex) {
        this.currentChapter = this.chapters[newIndex];
        console.log(this.currentChapter);
        console.log(newIndex);
        this.navigateToPage(this.currentChapter.ChapterLink);
      }
    }
  }
  

  getDirection() {
    if(this.isRightToLeft){
      return "Right TO Left";
    }
    else{
      return "left To right";}
  }
  changeDirection() {
    this.isRightToLeft=!this.isRightToLeft
    this.directionControl.emit(this.isRightToLeft);
  }

  changeProgress() {
    this.currentProgress=!this.currentProgress;
    this.progressControl.emit(this.currentProgress);
    }
    getChapters(){
      this.mangaService.getChapters(this.itemLink, this.extId).subscribe({
        next:(res)=>{
          this.chapters = res;
          
      this.chapters.forEach((item)=>{
        if(this.chapterLink==item.ChapterLink){
          this.currentChapter=item
        }
        })
        }
      });
    }
    getChapterTitle(title: string) {
      if(title == "N/A"){
        return ;
      }
      else{
        return title;
      }
    }
  
    navigateToPage(chapterLink:string) {
      this.router.navigate(['/manga/page'],{ queryParams: { chapterLink: chapterLink,itemLink: this.itemLink,extId:this.extId } }
      )
      this.currentChapter = this.chapters.find(item => item.ChapterLink === chapterLink) as Chapter;
    }

    getExtension(){
      this.extensionService.getExtensionById(this.extId).subscribe({
        next:(res :any)=>{
          this.extension=res as Extension
        }
      })

    }
    navigateToManga() {
      this.router.navigate(['/manga'], { queryParams: { extId: this.extId,itemLink:this.itemLink } });
    }
    ngOnInit(){
      this.getChapters()
      this.getExtension()
    }

    @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    if (this.isSideMenuOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeSideMenu()
    }
  }
}
