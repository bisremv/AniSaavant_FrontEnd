import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserManagmentService } from './user-managment.service';
import { AnimeInfo } from '../Models/animeInfo';
import { Season } from '../Models/season';
import { MangaItem } from '../Models/MangaItem';
import { Chapter } from '../Models/chapters';
import { AnimeHero } from '../Models/anime_hero';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
 
  url: string ="https://anisavantbackendnew-production.up.railway.app";
  userService:UserManagmentService=inject(UserManagmentService);
  http:HttpClient=inject(HttpClient)
  constructor() { }
  
  addAnimeToLibrary(anime:AnimeInfo,season:Season[]){
    let id =this.userService.user.value.id;
    return this.http.post(this.url+"/api/library/add/anime?userId="+id,
        {anime:anime,seasons:season} , { responseType: 'text' })
  }
  getAllAnimeInLibrary(){
    let id =this.userService.user.value.id as number|string|boolean;
    let params = new HttpParams().set('userId', id);
    return this.http.get(this.url+"/api/library/get/lib-anime",{params})
  }

  addMangaToLibrary(manga:MangaItem,chapters:Chapter[]){
    let id =this.userService.user.value.id;
    return this.http.post(this.url+"/api/library/add/manga?userId="+id,
        {manga:manga,chapters:chapters} , { responseType: 'text' })
  }
  getAllMangaInLibrary() {
    let id =this.userService.user.value.id as number|string|boolean;
    let params = new HttpParams().set('userId', id);
    return this.http.get(this.url+"/api/library/get/lib-manga",{params})
  }

  removeAnimeFromLibrary(animeId: number) {
  let id =this.userService.user.value.id as number;
  let params = new HttpParams().set('userId', id).set('animeId',animeId);
  return  this.http.delete(this.url+"/api/library/remove/anime",{params,responseType:'text'})
  }
  removeMangaFromLibrary(mangaId: number ) {
    let id =this.userService.user.value.id as number;
    let params = new HttpParams().set('userId', id).set('mangaId',mangaId);
   return this.http.delete(this.url+"/api/library/remove/manga",{params,responseType:'text'})
  }
}
