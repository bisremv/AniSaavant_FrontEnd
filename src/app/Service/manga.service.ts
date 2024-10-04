import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MangaService {
        
        
        url: string ="http://localhost:8080";
        http:HttpClient=inject(HttpClient);
    
        getMangaInfo(itemLink:string, extId:number) {
        return this.http.get(this.url+"/api/manga/mangaInfo?itemLink="+itemLink+"&extId="+extId).pipe(tap((response: any) => {
            return response;
        }));
            }
        getChapters(itemLink: string, extId: number) {
            return this.http.get(this.url+"/api/manga/chapters?itemLink="+itemLink+"&extId="+extId).pipe(tap((response: any) => {
                return response;
            }));
        }
}