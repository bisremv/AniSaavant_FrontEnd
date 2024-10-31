import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { MangaItem } from '../Models/MangaItem';
import { UserManagmentService } from './user-managment.service';

@Injectable({
  providedIn: 'root'
})
export class DiscoverService {
  url: string ="https://anisavantbackendnew-production.up.railway.app";
  http:HttpClient=inject(HttpClient);
  userManagmentService:UserManagmentService=inject(UserManagmentService);
  
  getPopularAnime(page:number) {
    let params = new HttpParams().set('page',page);
    return this.http.get(this.url+'/api/discover/popular/anime' , {params})
    .pipe(tap((response: any) => {
      return response;
    }));
  }
  getMostWatchedAnime(page:number) {
    let params = new HttpParams().set('page',page);

    return this.http.get(this.url+'/api/discover/mostWatched/anime' , {params})
    .pipe(tap((response: any) => {
      return response;
    }));
  }
  getAnticipatedAnime(page:number) {
    let params = new HttpParams().set('page',page);

    return this.http.get(this.url+'/api/discover/anticipated/anime' , {params})
    .pipe(tap((response: any) => {
      return response;
    }));
  }
  
  getAnimeTrending(page:number){
    let params = new HttpParams().set('page',page);

    return this.http.get(this.url+'/api/discover/trending/anime' , {params})
    .pipe(tap((response: any) => {
      
      return response;
    }));
  }
  getAnimeHero(page:number)
  {
    let params = new HttpParams().set('page',page);

    return this.http.get(this.url+'/api/discover/airing/today')
    .pipe(tap((response: any) => {
      return response;
    }));
  }
  getMangaList() {
    return this.http.get(this.url+'/api/discover/hero/manga?extId='+1)
    .pipe(tap((response: any) => {
      response.forEach((item:MangaItem) => {
        item.extId = 1;
      })
      return response;
    }));
  }
  getLatestManga(extId:number){
    return this.http.get(this.url+'/api/discover/Latest/manga?extId='+extId)
    .pipe(tap((response: any) => {
      response.forEach((item:MangaItem) => {
        item.extId = extId;
      })
      return response;}));
    }


  getPopularManga(extId:number){
    return this.http.get(this.url+'/api/discover/popular/manga?extId='+extId)
    .pipe(tap((response: any) => {
      response.forEach((item:MangaItem) => {
        item.extId = extId;
      })
      return response;}));
    }
    getUpcomingAnime() {
      let params = new HttpParams().set('userId', this.userManagmentService.user.value.id as number);
      return  this.http.get(this.url+'/api/discover/upcoming/episode',{params})
    }
}