// anime-hero.model.ts

export class AnimeHero {

    constructor(
    public animeId: number,
    public tmdbId: number,
    public description: string,
    public image: string,
    public title: string,
    public votes: number,
    public rating: number,
    public type: string,
    public date: string
    ) {
    }
    
    /* 
        "animeId": null,
        "tmdbId": 250598,
        "name": "The Ossan Newbie Adventurer, Trained to Death by the Most Powerful Party, Became Invincible",
        "type": "Anime",
        "overview": "Normally, people choose to become adventurers in their teens. At 30 years old, Rick Gladiator bucks the trend by leaving his job as a guild clerk to become an adventurer. He begins as a novice F-rank with the fighting strength of an S-rank. After two years of brutal training with the continent’s strongest party, Orichalcum Fist, Rick will defeat anyone who underestimates him!",
        "backdropPath": "/1Jz9C5BOIjKPEWhm3zWcpDHJ0TT.jpg",
        "voteAverage": 6.8,
        "voteCount": 5,
        "firstAirDate": "2024-07-02"
         */
}
