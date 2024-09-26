import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AnimeItemComponent } from "./Components/anime-item/anime-item.component";
import { NavBarComponent } from "./Components/nav-bar/nav-bar.component";
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserManagmentService } from './Service/user-managment.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule ,RouterModule,AnimeItemComponent, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Anisavant-FrontEnd';
  showNavBar:boolean = true;
  constructor(private route: ActivatedRoute, private router: Router) {}
  userService:UserManagmentService=inject(UserManagmentService);
  ngOnInit(): void {
    // Subscribe to router events
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd)) // Listen to the end of navigation
      .subscribe((event: any) => {
        if (this.router.url === '/signIn' || this.router.url === '/signUp') { 
          this.showNavBar= false;
        }
        else{
          this.showNavBar= true;
        }
      });
      this.userService.autoLogin();
  }
}
