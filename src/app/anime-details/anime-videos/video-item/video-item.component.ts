import { Component, inject, Input, OnInit } from '@angular/core';
import { AnimeService } from '../../../Service/anime.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Videos } from '../../../Models/VIdeos';

@Component({
  selector: 'app-video-item',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './video-item.component.html',
  styleUrl: './video-item.component.scss'
})
export class VideoItemComponent implements OnInit {
  @Input() tmdbId: number = 0;
  animeService:AnimeService=inject(AnimeService)
  private _sanitizer: DomSanitizer = inject(DomSanitizer);
  safeURL: any;
  @Input() video:Videos= {
    iso_639_1: '',
    iso_3166_1: '',
    name: '',
    key: '',
    published_at: '',
    site: '',
    size: 0,
    type: '',
    official: false,
    id: ''
  };

  ngOnInit(){
    this.sanitizeTheUrl(this.video.key);
  }

  sanitizeTheUrl(videoKey: string){
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoKey}`);
  }

}
