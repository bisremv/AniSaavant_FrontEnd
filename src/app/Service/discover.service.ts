import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscoverService {
  
  
  
  url: string ="http://localhost:8080";
  http:HttpClient=inject(HttpClient);
  
  getPopularAnime() {
    return this.http.get(this.url+'/api/discover/popular/anime')
    .pipe(tap((response: any) => {
      return response;
    }));
  }
  getMostWatchedAnime() {
    return this.http.get(this.url+'/api/discover/mostWatched/anime')
    .pipe(tap((response: any) => {
      return response;
    }));
  }
  getAnticipatedAnime() {
    return this.http.get(this.url+'/api/discover/anticipated/anime')
    .pipe(tap((response: any) => {
      return response;
    }));
  }
  
  getAnimeTrending(){
    return this.http.get(this.url+'/api/discover/trending/anime')
    .pipe(tap((response: any) => {
      // console.log("trending anime");
      // console.log(response);
      return response;
    }));
  }
  getAnimeHero()
  {
    return this.http.get(this.url+'/api/discover/airing/today')
    .pipe(tap((response: any) => {
      // console.log("hero anime");
      // console.log(response);
      return response;
    }));
  }
  getMangaList() {
    return this.http.get(this.url+'/api/discover/hero/manga')
    .pipe(tap((response: any) => {
      // console.log(response);
      return response;
    }));
  }
  getLatestManga(exId:number){
    if(exId=0){
      return ;
    }
    return this.http.get(this.url+'/api/discover/Latest/manga?extId='+exId)
    }


  getPopularManga(exId:number){
    if(exId=0){
      return ;
    }
    return this.http.get(this.url+'/api/discover/popular/manga?extId='+exId)

    }
}