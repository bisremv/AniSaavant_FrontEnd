import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserManagmentService } from '../../Service/user-managment.service';
import { Router } from '@angular/router';
import { exhaustMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  @ViewChild('signUpForm')form!: NgForm;
  url: string ="";
  userManagementService=inject(UserManagmentService);
  route:Router=inject(Router);
  isLoading: boolean = false;
  isSuccess: boolean = false;
  isError: boolean = false;
  Message: string = '';
  OnFormSubmit() {
    this.SignInUser(this.form.value);
  }
  
  
  SignInUser(data: {userEmail: string, password: string}) {
  this.isLoading = true;
  this.isError = false;
  this.isSuccess= false;
  this.userManagementService.signIn(data).subscribe(
    {
      next:(response) => {
    },
    error:(error) => {
    this.Message = "Invalid Credentials";
    this.isError = true;
      this.isLoading = false;
    },
    complete:() => {
    this.isSuccess = true;
    this.isLoading = false;
    this.route.navigate(['discover']);
    
    }
  }
  );

  }
  
navigateToSignUp() {
  this.route.navigate(['signUp']);
}
navigateToHome() {
  this.route.navigate(['']);
}
}
