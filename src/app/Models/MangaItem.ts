export class MangaItem{
    constructor(
        public title: string,
        public status: string,
        public chapterNumber: number,
        public img: string,
        public type:string,
        public progress:number,
        public releaseDate:string,
        public itemLink:string,
        public extId: number,
        public mangaId: number,
    ) {
    
    }
   }