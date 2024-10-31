import { Chapter } from "./chapters";
import { MangaInfo } from "./mangaInfo";

export class latestChapter{
    constructor(
        public latestChapterId: number,
        public newChapter: boolean,
        public chapter:Chapter,
        public manga:MangaInfo ,
        public order:number,

    ){}  
}