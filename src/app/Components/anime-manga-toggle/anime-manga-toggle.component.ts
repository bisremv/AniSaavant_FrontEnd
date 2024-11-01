import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-anime-manga-toggle',
  standalone: true,
  imports: [FormsModule ,RouterModule,CommonModule],
  templateUrl: './anime-manga-toggle.component.html',
  styleUrl: './anime-manga-toggle.component.scss'
})
export class AnimeMangaToggleComponent {
  constructor(private route: ActivatedRoute, private router: Router ) {}

  isAnimePage: boolean = false;
  isMangaPage: boolean = false;

  ngOnInit(): void {
    // Check the initial URL to set the flags
    this.updatePageFlags(this.router.url);

    // Subscribe to router events
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updatePageFlags(this.router.url));
  }

  private updatePageFlags(url: string): void {
    if (url.includes('anime')) {
      this.isAnimePage = true;
      this.isMangaPage = false;
    } else if (url.includes('manga')) {
      this.isAnimePage = false;
      this.isMangaPage = true;
    } else {
      this.isAnimePage = false;
      this.isMangaPage = false;
    }
  }
}
