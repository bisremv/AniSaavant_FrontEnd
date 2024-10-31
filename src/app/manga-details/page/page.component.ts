import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from "../../Components/nav-bar/nav-bar.component";
import { Page } from '../../Models/pages';
import { PageControlsComponent } from "./page-controls/page-controls.component";
import { MangaService } from '../../Service/manga.service';
import { ActivatedRoute } from '@angular/router';
import { get } from 'http';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, NavBarComponent, PageControlsComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent implements OnInit {

mangaService:MangaService=inject(MangaService);
activeRoute:ActivatedRoute=inject(ActivatedRoute);
pages:Page[]=[]
chapterLink:string=''
itemLink:string=''
extId:number=0;
isSideMenuOpen: boolean = true; // Controls sidenav visibility
isNavOpen: boolean = true; // Controls navbar visibility
pageView="single";
imageFit="no"
pageNumber=0;
page2Number=1;
progress=true;
loading = true; // State to track image loading
isRightToLeft: boolean=true;
    NavToggle(isNavOpen: boolean) {
        this.isNavOpen = isNavOpen;

    }
    SideToggle(isSideMenuOpen: boolean) {
    
    this.isSideMenuOpen = isSideMenuOpen;
    }
    changePageView($event: string) {
        this.pageView=$event;
    }
    changeImageFit($event: string) {
        this.imageFit=$event;
    }
    toggleDirection($event: boolean) {
        this.isRightToLeft=$event;    
    }
    changePage(isRight: boolean) {
        if(this.isRightToLeft){
            if(isRight){
                if(this.page2Number<=this.pages.length ){
                    this.loading = true;
                    this.pageNumber++;
                this.page2Number++;
            }
            }
            else{
                if(this.pageNumber>0){
                    this.loading = true;
                    this.pageNumber--;
                    this.page2Number--;
                }
            }
        }
        else if(!this.isRightToLeft){
            if(!isRight){
                if(this.page2Number<this.pages.length){
                    this.loading = true;
                    this.pageNumber++;
                    this.page2Number++;
                }
            }
            else{
                if(this.pageNumber>0){
                    this.loading = true;
                    this.pageNumber--;
                    this.page2Number--;
                }
            }
        }
    }
    changeProgress(progress:boolean) {
        this.progress=progress;
    }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe(params => {
            this.chapterLink = params['chapterLink'];
            this.extId = params['extId'];
            this.itemLink=params['itemLink'];
            this.changeByProgress(0);
            this.getPages(this.chapterLink, this.extId);
        });
    }
    getPages(chapterLink: string, extId: number) {
        this.mangaService.getPages(chapterLink, extId).subscribe(
            (response: any) => {
            this.pages=response as Page[];
        });
    }

    onImageLoad() {
        this.loading = false; // Set loading state to false when image is loaded
    }
    changePageNumber($event: number) {
        this.changeByProgress($event);
    }

    changeByProgress(index: number) {
    if(index<this.pages.length){
        this.pageNumber=index;
        this.page2Number=index+2;
    }
    }
}

