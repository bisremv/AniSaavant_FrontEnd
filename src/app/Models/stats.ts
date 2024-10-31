export class UserStats {
    totalSeasons: number;
    totalEpisode: number;
    totalAnime: number;
    totalManga: number;
    totalTimeOnManga: number;
    totalTimeOnAnime: number;
    totalChapter: number;
    fevGenreAnime: {
        [key: string]: number;
    };
    fevGenreManga: {
        [key: string]: number;
    };

    constructor(data: any) {
        this.totalSeasons = data.totalSeasons || 0;
        this.totalEpisode = data.totalEpisode || 0;
        this.totalAnime = data.totalAnime || 0;
        this.totalManga = data.totalManga || 0;
        this.totalTimeOnManga = data.totalTimeOnManga || 0;
        this.totalTimeOnAnime = data.totalTimeOnAnime || 0;
        this.totalChapter = data.totalChapter || 0;
        this.fevGenreAnime = data.fevGenreAnime || {};
        this.fevGenreManga = data.fevGenreManga || {};
    }
    }
