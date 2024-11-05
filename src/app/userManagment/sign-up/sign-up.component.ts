import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserManagmentService } from '../../Service/user-managment.service';
import { Router } from '@angular/router';
import { PopupService } from '../../Service/popup.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule , CommonModule ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  @ViewChild('registerForm') form!: NgForm;
  url: string | undefined;
  userManagementService=inject(UserManagmentService);
  popupService:PopupService=inject(PopupService)
  route:Router=inject(Router);
  isLoading: boolean = false;
  isSuccess: boolean = false;
  isError: boolean = false;
  Message: string = '';
  
  OnFormSubmit() {
    this.sendUserInfo(this.form.value);
  }


sendUserInfo(data: {userName: string, userEmail: string, password: string}) {
  this.isLoading = true;
  this.isError= false;
  this.Message= '';
  
  this.userManagementService.createUser(data).subscribe({
    next:(response) => {
      this.Message= response;

      },
    error:(error) => {
      this.isLoading = false;
      this.isError=true;
      this.Message = error.error;
      this.popupService.openPopup("sign", this.Message,true,false)

    },
    complete:() => {
      this.isLoading = false;
      this.popupService.openPopup("sign", this.Message,true,false)
      this.navigateToSignIN()
    }
  });;
}

navigateToSignIN() {
  this.route.navigate(['signIn']);

}
navigateToHome() {
  this.route.navigate(['']);
}

}

