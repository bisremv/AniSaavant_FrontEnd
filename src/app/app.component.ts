import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AnimeItemComponent } from "./Components/anime-item/anime-item.component";
import { NavBarComponent } from "./Components/nav-bar/nav-bar.component";
import { filter } from 'rxjs';
import { CommonModule, ViewportScroller } from '@angular/common';
import { UserManagmentService } from './Service/user-managment.service';
import { PopUpComponent } from "./Components/pop-up/pop-up.component";
import { PopupService } from './Service/popup.service';
import { LoadingComponent } from "./Components/loading/loading.component";
import { StreamComponent } from "./stream/stream.component";
import { NavBarPageHIdeService } from './Service/nav-bar-page-hide.service';
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, AnimeItemComponent, NavBarComponent, PopUpComponent, LoadingComponent, StreamComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit , AfterViewInit {
  title = 'Anisavant-FrontEnd';
  showFooter:boolean = true;  
  @ViewChild('globalModal') globalModal!: PopUpComponent;
  navControl:NavBarPageHIdeService=inject(NavBarPageHIdeService);
  userService:UserManagmentService=inject(UserManagmentService);
  
  constructor(private route: ActivatedRoute, private router: Router ,private popupService:PopupService, private viewportScroller: ViewportScroller) {}
  ngOnInit(): void {
    // Subscribe to router events
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd)) // Listen to the end of navigation
      .subscribe((event: any) => {
        if (this.router.url === '/signIn' || this.router.url === '/signUp' ) { 
          this.navControl.closeNav();
        }
        else{
          this.navControl.openNAv();
        }
        if(this.router.url.includes('page') ){
          this.showFooter=false;
        }
        else{
          this.showFooter=true;
        }
      });
      this.viewportScroller.scrollToPosition([0, 0]); // Scroll to top
      this.userService.autoLogin();
  }

  ngAfterViewInit() {
    this.popupService.registerModal(this.globalModal);
  }
}
