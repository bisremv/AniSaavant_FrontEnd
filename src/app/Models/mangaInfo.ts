
export class MangaInfo{

    constructor(
        public mangaId:number,
        public chapterNumber:number,
        public progress:number,
        public author:string,
        public itemImg:string,
        public itemLink:string,
        public type:string,
        public title:string,
        public status:string,
        public description:string,
        public extId:number,
        public mangaGener:Array<string>


        

    ){}
    
}