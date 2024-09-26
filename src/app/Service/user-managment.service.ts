import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagmentService {
  constructor(private http: HttpClient) {}
  url: string ="http://localhost:8080";
  user = new BehaviorSubject<User>(new User(undefined, undefined, undefined, undefined, undefined));
  
  
  isLoggedIn(): boolean {
    const currentUser = this.user.getValue();
    return !!currentUser.token; // Returns true if token exists, false otherwise
  }

  signIn(data: { userEmail: string; password: string; }) {
    return this.http.post(this.url+"/api/user/signIn", data).pipe(tap((response: any) => {
      const userObj = new User( response.userName,data.userEmail, response.id, response._token, response._expirationData); 
      localStorage.setItem('userData', JSON.stringify(userObj));
      this.user.next(userObj);
    }));
}
  
  createUser(data: { userName: string; userEmail: string; password: string }) {
  const uri=this.url+"/api/user/register";
  return this.http.post(uri, data, { responseType: 'text' })
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.userName,
      userData.userEmail,
      userData.id,
      userData._token,
      new Date(userData._expirationData)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(new User( undefined,undefined,undefined,undefined,undefined));
    localStorage.removeItem('userData');
  }

  }

