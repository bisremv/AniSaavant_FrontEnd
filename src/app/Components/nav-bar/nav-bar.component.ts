import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserManagmentService } from '../../Service/user-managment.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule ,RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  isMenuOpen:boolean=false;
  isSearchOpen:boolean=false;
  isLogedIn: boolean=false;
  userService: UserManagmentService=inject(UserManagmentService);
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

}
