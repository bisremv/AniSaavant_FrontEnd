export class Filter{
    
    constructor(
        public search:string,
        public maxYear:number,
        public minYear:number,
        public status:string,
        public country:string[],
        public studio:{}[],
        public ageRating:string[],
        public minValueRuntime:number,
        public maxValueRuntime:number,
        public tmdbRatingMin:number,
        public tmdbRatingMax:number,
        public imdbRatingMin:number,
        public imdbRatingMax:number,
        public rtRatingMin:number,
        public rtRatingMax:number
    ){
    }
    
}