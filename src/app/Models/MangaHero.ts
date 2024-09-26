// anime-hero.model.ts
export class MangaHero {
    constructor(
        public title:string,
        public status:string,
        public img:string,
        public type:string,
        public progress:number,
        public releaseDate:string,
        public chapterNumber:string,
        public itemLink:string,
    ){}
}
