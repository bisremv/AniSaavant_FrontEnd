import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserManagmentService } from './user-managment.service';
import { Observable, tap } from 'rxjs';
import { Extension } from '../Models/Extenison';

@Injectable({
  providedIn: 'root'
})
export class ExtensionService {
  url: string ="https://anisavantbackendnew-production.up.railway.app";
  userService:UserManagmentService=inject(UserManagmentService)
constructor(private http:HttpClient) { }
  
    getExtensionById(extId: number) {
    return  this.http.get(this.url+"/api/ext/get?extId="+extId)
    }
  

  getAllExtensionList(){
    return this.http.get(this.url+"/api/ext/get/List")
  }
  
  getActiveExtensionList(){
    if(this.userService.isLoggedIn()){
      let userId =this.userService.user.value.id
      return this.http.get(this.url+"/api/ext/user/all/activated?userId="+userId)
    }
    return new Observable();
  }
  
  // this return for loge in user activated ext but for not loge in user all
  getExtension(){
      let isLogged :boolean = this.userService.isLoggedIn()
      if(isLogged){
        return this.getActiveExtensionList()
        }
        else{
        return this.getAllExtensionList()
        }
  }
  
  activateExtension(extId: number) {
    let userId =this.userService.user.value.id;
    return this.http.post(this.url+"/api/ext/user/activate/ext?userId="+userId+"&extId="+extId,{}, { responseType: 'text' })
  }
  removeExtension(extId:number){
    let userId =this.userService.user.value.id;
    return this.http.delete(this.url+"/api/ext/user/deactivate/ext?userId="+userId+"&extId="+extId, { responseType: 'text' })
  }
}
