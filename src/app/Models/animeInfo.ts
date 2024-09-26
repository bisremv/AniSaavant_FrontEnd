export class AnimeInfo{
    constructor(
        public animeId: number,
        public tmdbId: number,
        public title: string,
        public originalName: string,
        public originalLanguage: string,
        public firstAirDate: string,
        public lastAirDate: string,
        public homepage: string,
        public popularity: number,
        public inProduction: boolean,
        public tagline: string,
        public type: string,
        public voteAverage: number,
        public voteCount: number,
        public status: string,
        public overview: string,
        public posterPath: string,
        public backdropPath: string,
        public numberOfEpisodes: number,
        public numberOfSeasons: number,
        public seasons: Array<{
            seasonId: number,
            airDate: string,
            episodeCount: number,
            name: string,
            overview: string,
            posterPath: string,
            seasonNumber: number,
            voteAverage: number
        }>,
        public productionCompanies: Array<{
            productionCompanyId: number,
            logoPath: string,
            name: string,
            originCountry: string
        }>,
        public episodeRunTime: Array<number>,
        public animeGener: Array<string>, 
    ){}
    
}