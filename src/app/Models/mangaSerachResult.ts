import { Extension } from "./Extenison";
import { MangaItem } from "./MangaItem";

export class MangaSearchResult{
    constructor(
        public ext:Extension,
        public result:Array<MangaItem>,
    ) {
    
    }
}