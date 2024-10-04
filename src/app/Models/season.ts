import { Episode } from "./episodes";

export class Season {
    constructor(
    public   seasonId: number,
    public   airDate: string,
    public   episodeCount: number,
    public   name: string,
    public   overview: string,
    public   posterPath: string,
    public   seasonNumber: number,
    public   voteAverage: number,
    public   episodes: Array<Episode>,
    ) { }
}
/* {
            "seasonId": 88919,
            "airDate": "2017-04-04",
            "episodeCount": 12,
            "name": "Specials",
            "overview": "",
            "posterPath": "/jEoUOaOzdf00lsTV7EW2ARcB9Pb.jpg",
            "seasonNumber": 0,
            "voteAverage": 0
            "air_date": "2017-04-01",
    "episode_count": 0,
    "id": 86525,
    "episodes": 
    "name": "Season 2",
    "overview": "",
    "poster_path": "/bLggKZhdEHhvax9jeT95MDxM6CA.jpg",
    "season_number": 2,
    "vote_average": 7
        }, */