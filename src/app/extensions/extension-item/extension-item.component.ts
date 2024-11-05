import { Component, inject, Input } from '@angular/core';
import { Extension } from '../../Models/Extenison';
import { CommonModule } from '@angular/common';
import { ExtensionService } from '../../Service/extension.service';
import { Router } from '@angular/router';
import { PopupService } from '../../Service/popup.service';
import { UserManagmentService } from '../../Service/user-managment.service';

@Component({
  selector: 'app-extension-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './extension-item.component.html',
  styleUrl: './extension-item.component.scss'
})
export class ExtensionItemComponent {
  @Input()
  ext:Extension=new Extension(0,"","","")
  @Input() 
  isActiveList:boolean=false;
  routes:Router=inject(Router);
  popUpMessage:PopupService=inject(PopupService);
  extension:ExtensionService=inject(ExtensionService)
  userService:UserManagmentService=inject(UserManagmentService)
  ngOnInit(){
    console.log("extItem",this.ext)
  }
  ActivateExtension() {
    if(this.userService.isLoggedIn()){
    this.extension.activateExtension(this.ext.exId).subscribe({
      next: (value) => {
      },
      error: (error) => {
        // Handle errors here
        this.popUpMessage.openPopup("Error", error.Message, false, false);
        // console.error("Error activating extension:", error);
      },
      complete: () => {
        // Handle completion here
        
        this.popUpMessage.openPopup("Error", "Extension activated successfully!", true, false);
        // console.log("Extension activated successfully!");
      }
    });}
    else{
      this.popUpMessage.openPopup("Error", "user is not signed in", false, false);

    }
  }
  RemoveExtension() {
    if(this.userService.isLoggedIn()){
    this.extension.removeExtension(this.ext.exId).subscribe(
      {
        next:(res)=>{
          console.log(res)
        },
        error:(err)=>{
          this.popUpMessage.openPopup("Error", err.Message, false, false);
        },
        complete:()=>{
          this.popUpMessage.openPopup("Error", "Extension deactivated successfully!", true, false);

        }
      }
    )}
    else{
      this.popUpMessage.openPopup("Error", "user is not signed in", false, false);

    }
  }
  navigateToExtension()
  {
    this.routes.navigate(['extension/page'], { queryParams: { extId: this.ext.exId } });
  }
}
