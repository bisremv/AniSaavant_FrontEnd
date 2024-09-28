export class Image{
    constructor(
        public aspect_ratio: number,
        public file_path: string,
        public height: number,
        public iso_639_1: string,
        public vote_average: number,
        public vote_count: number,
        public width: number
    ){}
    /* "aspect_ratio": 3.155,
            "height": 634,
            "iso_639_1": "en",
            "file_path": "/x2akyNYTkIUExuM46FaJ2NUcAlw.png",
            "vote_average": 0.0,
            "vote_count": 0,
            "width": 2000 */
}