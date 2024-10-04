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
    url: string ="http://localhost:8080";
    http:HttpClient=inject(HttpClient);
    userMangamentService:UserManagmentService=inject(UserManagmentService);

    
    searchAnime(filters: Filter) {
          /* /api/search/anime?search=m&page=1&status=ended&years=2000-2026&countries=jp&certifications=nr&runtimes=2-120&tmdb_ratings=4-10&imdb_ratings=4-10&rt_meters=4-100&studio_ids=1218&page=1 */
          let search = filters.search;
          let params="?page=1";
          params+="&search="+search;
            // let page = filters.page;
            if(filters.status!=""){
              params+="&status="+filters.status;
            }
            if(filters.minYear!=0 || filters.maxYear!=0){
              params+="&years="+filters.minYear+"-"+filters.maxYear;
            }
            if(filters.minValueRuntime!=0 || filters.maxValueRuntime!=0){
              params+="&runtimes="+filters.minValueRuntime+"-"+filters.maxValueRuntime;
            }
            if(filters.tmdbRatingMin!=0 || filters.tmdbRatingMax!=10){
              params+="&tmdb_ratings="+filters.tmdbRatingMin+"-"+filters.tmdbRatingMax;
            }
            if(filters.imdbRatingMin!=0 || filters.imdbRatingMax!=10){
              params+="&imdb_ratings="+filters.imdbRatingMin+"-"+filters.imdbRatingMax;
            }
            if(filters.rtRatingMin!=0 || filters.rtRatingMax!=10){
              params+="&rt_meters="+filters.rtRatingMin+"-"+filters.rtRatingMax;
            }
            let countries = ""
            filters.country.forEach(country => {
              switch (country) {
                case "Japan":
                  country = "jp";
                  break;
                case "Korea":
                  country = "kr";
                  break;
                case "China":
                  country = "cn";
                  break;
                default:
                    country = "jp";
                  break;
              }
              
              if(countries !=''){
                countries+=","+country;
              }
              else{
                countries+=country;
              }
            });
            if(countries!=''){
              params+="&countries="+countries;
            }
            let certifications = ''
            filters.ageRating.forEach(certification => {
              if(certifications!=''){
                certifications+=","+certification;
              }
              else{
                certifications+=certification;
              }
            });
            if(certifications!=''){
              params+="&certifications="+certifications;
            }
            let studio_ids =''; 
            filters.studio.forEach(studio => {
              if(studio_ids!=''){
                studio_ids+=","+studio;
              }
              else{
                studio_ids+=studio;
              }});
            if(studio_ids!=''){
              params+="&studio_ids="+studio_ids;
            }
              console.log("search anime",params);
        return  this.http.get(this.url+"/api/search/anime"+params).pipe(tap((response: any) => {
              console.log("search anime");
              console.log(response);
            }));
          }
    
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
  }