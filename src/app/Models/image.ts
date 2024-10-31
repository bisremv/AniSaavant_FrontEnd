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
    
}