import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { UserManagmentService } from "./user-managment.service";
import { Filter } from "../Models/SearchFilter";
import { tap } from "rxjs";
import e from "express";

@Injectable({
    providedIn: 'root'
  })
export class AnimeService {

    url: string ="https://anisavantbackendnew-production-3de1.up.railway.app";
    http:HttpClient=inject(HttpClient);
    userMangamentService:UserManagmentService=inject(UserManagmentService);


    getAnimeInfo(tmdbAnimeId: number, animeId: number) {
      if(animeId==null){
        animeId=0
      }
    return this.http.get(this.url+"/api/anime/get/details?tmdbAnimeId="+tmdbAnimeId+"&animeId="+animeId).pipe(tap((response: any) => {
        return response;
    }));
        }
    getSimilarAnime(animeId: number) {

        return this.http.get(this.url+"/api/anime/get/similar?animeId="+animeId).pipe(tap((response: any) => {
        }));
        }
    getSeason(animeId: number, seasonNumber: number) {
      let userId:number|undefined=0;
      this.userMangamentService.user.subscribe(user => {
        userId=user.id;
      });
      if (userId==undefined || userId==null || userId==0) {
        userId=0;
      }
      return  this.http.get(this.url+"/api/anime/get/episodes?userId="+userId+"&tmdbAnimeId="+animeId+"&seasonNumber="+seasonNumber).pipe(tap((response: any) => {
            return response;
          } ));
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
    getAnimeById(showTraktId: number) {
      return this.http.get(this.url+"/api/anime/get/show?animeId="+showTraktId).pipe(tap((response: any) => {
    }));
  }
}
