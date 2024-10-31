export class UpcomingEpisode {
    constructor(
        public season: number,
        public number: number,
        public title: string,
        public runtime: string,
        public first_aired : Date,
        public animeId: number,
        public tmdbId: number,
    ) { }

    
}