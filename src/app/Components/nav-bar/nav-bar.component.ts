import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserManagmentService } from '../../Service/user-managment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule ,RouterModule,FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  isMenuOpen:boolean=false;
  isSearchOpen:boolean=false;
  isLogedIn: boolean=false;
  userService: UserManagmentService=inject(UserManagmentService);
  searchQuery: string = '';
  routes:Router=inject(Router);
  searchType: string = 'anime';
  isSearchAnime: boolean = true;
  menuToggle(){
    if(this.isSearchOpen){
      this.isSearchOpen=false;
    }
    this.isMenuOpen=!this.isMenuOpen;
  }

  logout() {
  this.userService.logout();
  }

  Searchtoggle() {
    if(this.isMenuOpen){
      this.isMenuOpen=false;
    }
    this.isSearchOpen = !this.isSearchOpen;
  }

ngOnInit() {
  this.isLogedIn = this.userService.isLoggedIn();
}
searchItem(){
  this.routes.navigate(['/search/'+this.searchType], { queryParams: { search: this.searchQuery } });
}

changeSearchType(type:string) {
if(type=='tomanga'){

this.isSearchAnime = false;
    this.searchType="manga"
}
if(type=='toanime'){

  this.isSearchAnime = true;
      this.searchType="anime"
  }
}
}
