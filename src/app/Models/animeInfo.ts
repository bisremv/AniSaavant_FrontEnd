import { Episode } from "./episodes";
import { ProductionCompany } from "./ProductionCompany";
import { Season } from "./season";

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
        public seasons: Array<Season>,
        public productionCompanies: Array<ProductionCompany>,
        public episodeRunTime: Array<number>,
        public animeGener: Array<string>, 
        public lastEpisodeToAir: Episode,
        public nextEpisodeToAir: Episode,
        
    ){}
    
}