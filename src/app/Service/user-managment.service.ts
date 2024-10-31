import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagmentService {
  constructor(private http: HttpClient) {}
  url: string ="https://anisavantbackendnew-production.up.railway.app";
  user = new BehaviorSubject<User>(new User(undefined, undefined, undefined, undefined, undefined, undefined));

  isLoggedIn(): boolean {
    const currentUser = this.user.getValue();
    return !!currentUser.token; // Returns true if token exists, false otherwise
  }

  signIn(data: { userEmail: string; password: string; }) {
    return this.http.post(this.url+"/api/user/signIn", data).pipe(tap((response: any) => {
      const userObj = new User( response.userName,response.userEmail, response.id, response._token, response._expirationData,response.profilePic); 
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
      new Date(userData._expirationData),
      userData.profilePic
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  getUserStats() {
    let params =new HttpParams().set('userId',this.user.value.id as number);
    return this.http.get(this.url+"/api/user/statistics",{params}).pipe(tap((response: any) => {
      return response;
    }));
  }

  logout() {
    this.user.next(new User( undefined,undefined,undefined,undefined,undefined));
    localStorage.removeItem('userData');
  }
  updateUser() {
    let userData = this.user.value;
    return this.http.put(this.url + "/api/user/update", {
      "userId": userData.id,
      "userName": userData.userName,
      "userEmail": userData.userEmail,
      "password": "", // Optional field, remove or update as needed
      "profilePic": userData.profilePic
    }).pipe(
      tap((response: any) => {
        // Keep the current token intact if the update API doesn't return the token
        const updatedUser = new User(
          response.userName,
          response.userEmail,
          response.userId,
          userData.token ?? undefined,  // Preserve the current token
          response._expirationData || userData.expirationData,  // Preserve expiration date if not returned
          response.profilePic
        );
        
        // Update local storage and the BehaviorSubject
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        this.user.next(updatedUser);
        
      })
    );
  }
  
  changeProfilePic(picIndex:number){
    this.user.value.profilePic=picIndex;
    return this.updateUser()
  }
  deleteUser(){
    let params =new HttpParams().set('userId',this.user.value.id as number);
    return this.http.delete(this.url+"/api/user/delete",{params,responseType:'text'})
}
}

