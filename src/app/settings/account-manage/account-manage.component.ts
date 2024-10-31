import { Component, inject, ViewChild } from '@angular/core';
import { UserManagmentService } from '../../Service/user-managment.service';
import { AboutusComponent } from "./aboutus/aboutus.component";
import { CommonModule } from '@angular/common';
import { ProfileselectionComponent } from "./profileselection/profileselection.component";
import { FormsModule, NgForm } from '@angular/forms';
import { PopupService } from '../../Service/popup.service';
import { LoadingComponent } from "../../Components/loading/loading.component";

@Component({
  selector: 'app-account-manage',
  standalone: true,
  imports: [AboutusComponent, CommonModule, ProfileselectionComponent, FormsModule, LoadingComponent],
  templateUrl: './account-manage.component.html',
  styleUrl: './account-manage.component.scss'
})
export class AccountManageComponent {
@ViewChild('formUpdate')form!: NgForm;
userManagment:UserManagmentService=inject(UserManagmentService)
isProfile:boolean=true;
popupService:PopupService=inject(PopupService)
loading:boolean=false;
loadingType='spinner'
tab:string="account";
logOut(){
  this.userManagment.logout()
  
  window.location.href = '/';
}
OnSubmit() {
  let user = this.userManagment.user.value; 
  if (user && this.form.value.username) {
    user.userName = this.form.value.username; // Update the userName field
    this.userManagment.user.next(user);       // Emit the updated user object
  this.userManagment.updateUser().subscribe({
    next:(res)=>{
      this.loading=true;
      this.loadingType='spinner'
          },
    error:(err)=>{
      this.loading=false;
      this.popupService.openPopup("account Status", err.message,false)
    },
    complete:()=>{
      this.loading=false;
      this.popupService.openPopup("account Status", " Account "+this.form.value.username+" information updated successfully",true)
    }
        })
  } 
  else{
    this.popupService.openPopup("account Status", "Please enter a valid username",false)
  }
}
clear(){
  this.form.reset();
}
deleteAccount(){
  this.loading=true;
  this.loadingType='delete'
  this.popupService.openPopup("account Status", "deleting",false,true)
  this.userManagment.deleteUser().subscribe({
    next:(res)=>{
    },
    error:(err)=>{
      this.loading=false;
      this.popupService.openPopup("account Status", err.message,false)
    },
      complete:()=>{
        this.loading=false;
        this.userManagment.logout()
        this.popupService.openPopup("account Status", "Account deleted successfully",true)
      }
    
  })
}

}
