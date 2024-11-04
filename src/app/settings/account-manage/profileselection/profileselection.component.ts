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
  
  // avatars: number[] = Array.from({ length: 46 }, (_, i) => i + 1);  // List of image indexes
  // selectedAvatar: number | null = null;  // Selected avatar index
  
  // // Set the selected avatar
  // selectAvatar(index: number): void {
    //   this.selectedAvatar = index;
    // }
    
    // // Generate URL for avatar image based on index
    // getAvatarUrl(index: number): string {
      //   return `images/userManagment/userAvatars/${index}.png`;
      // }
      
      private userService = inject(UserManagmentService);  // Inject UserManagmentService
      
      avatars = Array.from({ length: 46 }, (_, i) => i + 1); // Assuming 40 avatars for demo
      selectedAvatar: number | null = null;
  avatarGroups: number[][] = [];
  currentGroupIndex = 0;
  groupWidth = 768; // Width of the group container, adjust as needed

  constructor() {
    this.groupAvatars();
  }
// Change profile picture
changeProfile(): void {
  if (this.selectedAvatar === null) {
    console.error("Please select an avatar before proceeding.");
    return;  // Ensure avatar is selected before calling service
  }

  this.userService.changeProfilePic(this.selectedAvatar).subscribe({
    next: (res) => {
      console.log("Profile picture updated successfully.", res);
    },
    error: (err) => {
      console.error("Failed to update profile picture:", err);
    },
    complete: () => {
      // Reload the page to reflect the updated profile picture
      window.location.reload();
    }
  });
}
  groupAvatars() {
    const groupSize = 8;
    for (let i = 0; i < this.avatars.length; i += groupSize) {
      this.avatarGroups.push(this.avatars.slice(i, i + groupSize));
    }
  }

  scrollLeft() {
    if (this.currentGroupIndex > 0) {
      this.currentGroupIndex--;
    }
  }

  scrollRight() {
    if (this.currentGroupIndex < this.avatarGroups.length - 1) {
      this.currentGroupIndex++;
    }
  }

  selectAvatar(avatar: number) {
    this.selectedAvatar = avatar;
  }


  getAvatarUrl(avatar: number): string {
    return `images/userManagment/userAvatars/${avatar}.png`; // Adjust based on actual avatar path
  }  
}
