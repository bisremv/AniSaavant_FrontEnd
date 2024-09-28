export class Episode{
    constructor(
        public id: number,
        public name: string,
        public tmdbId: number,
        public overview: string,
        public stillPath: string,
        public airDate: string,
        public episodeNumber: number,
        public seasonNumber: number,
        public episodeType: string,
        public runtime: number,
        public voteAverage: number,
        public voteCount: number,
        public productionCode: string,
        public watched: boolean
    )
    {
    }
}