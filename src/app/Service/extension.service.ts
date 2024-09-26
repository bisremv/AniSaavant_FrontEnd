import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtensionService {
  url: string ="http://localhost:8080";

constructor(private http:HttpClient) { }
getExtensionList(){
  return this.http.get(this.url+"/api/ext/get/List")
}

}
