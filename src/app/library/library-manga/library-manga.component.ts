import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MangaItem } from '../../Models/MangaItem';
import { MangaGridItemComponent } from "../../Components/manga-grid-item/manga-grid-item.component";
import { LibraryService } from '../../Service/library.service';

@Component({
  selector: 'app-library-manga',
  standalone: true,
  imports: [CommonModule, MangaGridItemComponent],
  templateUrl: './library-manga.component.html',
  styleUrl: './library-manga.component.scss'
})
export class LibraryMangaComponent {
  mangaList:MangaItem[] = [];
  library:LibraryService =inject(LibraryService);
  ngOnInit(): void {
    this.library.getAllMangaInLibrary()
    .subscribe(
      {
        next:(res)=>{
          this.mangaList=res as MangaItem[];
        }
      }
    )
  }

  onMangaDelete(mangaId: number) {
    this.mangaList = this.mangaList.filter((item) => item.mangaId != mangaId);
  }
}
