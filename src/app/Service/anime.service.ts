import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { tap } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class AnimeService {
  
 
    
url: string ="http://localhost:8080";
http:HttpClient=inject(HttpClient);

    getAnimeInfo(tmdbAnimeId: number, animeId: number) {
    return this.http.get(this.url+"/api/anime/details?tmdbAnimeId="+tmdbAnimeId+"&animeId="+animeId).pipe(tap((response: any) => {
        return response;
    }));
        }
        getSimilarAnime(animeId: number) {
        
        return this.http.get(this.url+"/api/anime/similar?animeId="+animeId).pipe(tap((response: any) => {
          console.log(".similar anime");
          console.log(response);
        }));
        }
    getAnimeVideos(tmdbAnimeId: number) {
    return this.http.get(this.url+"/api/anime/get/videos?tmdbAnimeId="+tmdbAnimeId).pipe(tap((response: any) => {
        return response;
    }));
    }
    getAnimeImages(tmdbAnimeId: number) {
      return this.http.get(this.url+"/api/anime/get/images?tmdbAnimeId="+tmdbAnimeId).pipe(tap((response: any) => {
    }));
    }
  }