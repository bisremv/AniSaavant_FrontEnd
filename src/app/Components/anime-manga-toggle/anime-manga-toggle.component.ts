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
  isAnimePage:boolean=true;
  ngOnInit(): void {
    // Subscribe to router events
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd)) // Listen to the end of navigation
      .subscribe((event: any) => {
        if (this.router.url.includes('anime') ) { 
          this.isAnimePage=true;
        }
        else if(this.router.url.includes('manga')){
          this.isAnimePage=false;
        }
      });
  }
}
