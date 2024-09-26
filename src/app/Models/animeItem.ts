export class animeItem{
    constructor(
        public  animeId: number,
        public  tmdbId: number,
        public  title: string,
        public  status: string,
        public  episode: number,
        public  img: string,
        public  season: number
    ) {
    }
}