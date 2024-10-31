import { Component, inject, Input } from '@angular/core';
import { MangaHero } from '../../../Models/MangaHero';
import { LibraryService } from '../../../Service/library.service';
import { PopupService } from '../../../Service/popup.service';
import { UserManagmentService } from '../../../Service/user-managment.service';
import { MangaItem } from '../../../Models/MangaItem';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manga-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manga-hero.component.html',
  styleUrl: './manga-hero.component.scss'
})
export class MangaHeroComponent {
  @Input() 
  manga:MangaItem=new MangaItem("","",0,"","",0,"","",0,0);
  library:LibraryService=inject(LibraryService)
  popupService:PopupService=inject(PopupService)
  userservise:UserManagmentService=inject(UserManagmentService)
  router:Router=inject(Router)
  ngOnInit(): void {
  }
  
  navigateToManga() {
    this.router.navigate(['/manga'], { queryParams: { extId: this.manga.extId,itemLink:this.manga.itemLink } });
  }

}
