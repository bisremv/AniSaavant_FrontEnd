export class MangaItem{
    constructor(
        public title: string,
        public status: string,
        public ChapterNumber: number,
        public img: string,
        public type:string,
        public progress:number,
        public releaseDate:string,
        public itemLink:string,
        public mangaId?: number,
    ) {
    
    }
   }