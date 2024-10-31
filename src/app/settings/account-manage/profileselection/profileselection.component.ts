import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserManagmentService } from '../../../Service/user-managment.service';

@Component({
  selector: 'app-profileselection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profileselection.component.html',
  styleUrl: './profileselection.component.scss'
})
export class ProfileselectionComponent {
  userService:UserManagmentService=inject(UserManagmentService);
  avatars: number[] = Array.from({ length: 46 }, (_, i) => i + 1);  // List of image indexes
  selectedAvatar: number | null = null;  // Selected avatar index

  selectAvatar(index: number): void {
    this.selectedAvatar = index;  // Set the selected avatar
  }

  getAvatarUrl(index: number) {
    
      return `images/userManagment/userAvatars/${index}.png`;  // Path to avatar images
    
  }

  changeProfile() {
    this.userService.changeProfilePic(this.selectedAvatar as number).subscribe(
      {
      next:(res) => {
      },
      error:(err)=>{
      },
      complete:()=>{
      window.location.reload();
      
    }
  });
    
  }
}
