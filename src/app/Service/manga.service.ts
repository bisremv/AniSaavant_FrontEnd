import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { tap } from "rxjs";
import { UserManagmentService } from "./user-managment.service";

@Injectable({
    providedIn: 'root'
})
export class MangaService {

        url: string ="https://anisavantbackendnew-production.up.railway.app";
        http:HttpClient=inject(HttpClient);
        userService:UserManagmentService=inject(UserManagmentService);
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


        getLatestMangaList() {
            let id =this.userService.user.value.id as number;
            let params = new HttpParams().set('userId', id);
        return this.http.get(this.url+"/api/manga/newChapters",{params}).pipe(tap((response: any) => {
            return response;
        }));
        }
        getPages(chapterLink:string, extId:number) {
            let params =new HttpParams().set('chapterLink',chapterLink)
            .set('extId',extId);
            return this.http.get(this.url+"/api/manga/pages",{params}).pipe(tap((response: any) => {
                return response;
            }));
        }
    }