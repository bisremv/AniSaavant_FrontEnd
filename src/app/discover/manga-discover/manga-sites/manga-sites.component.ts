import { Component, inject, Input, OnInit } from '@angular/core';
import { MangaGroupComponent } from "../../../Components/manga-group/manga-group.component";
import { Extension } from '../../../Models/Extenison';
import { CommonModule } from '@angular/common'; 
import { DiscoverService } from '../../../Service/discover.service';
import { MangaHero } from '../../../Models/MangaHero';
import { MangaItem } from '../../../Models/MangaItem';
@Component({
  selector: 'app-manga-sites',
  standalone: true,
  imports: [MangaGroupComponent , CommonModule],
  templateUrl: './manga-sites.component.html',
  styleUrl: './manga-sites.component.scss'
})
export class MangaSitesComponent implements OnInit{
  discover:DiscoverService=inject(DiscoverService);
  @Input()
  ext:Extension=new Extension(0,"","","");
  PopularList:MangaItem[]=[  ]
  LatestList:MangaItem[]=[];
ngOnInit(){
  this.getLatest();
  this.getPopular();
}

  getLatest(){
    this.discover.getLatestManga(this.ext.exId)?.subscribe({
      next:(latest)=>{
        this.LatestList=(latest as MangaItem[]);
      }
    })
  }
  getPopular(){
    this.discover.getPopularManga(this.ext.exId)?.subscribe({
      next:(popular)=>{
        this.PopularList=(popular as MangaItem[]);
      }
    })
  }
}
