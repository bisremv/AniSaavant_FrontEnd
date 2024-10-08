import { Routes } from '@angular/router';
import { DiscoverComponent } from './discover/discover.component';
import { AnimeDiscoverComponent } from './discover/anime-discover/anime-discover.component';
import { MangaDiscoverComponent } from './discover/manga-discover/manga-discover.component';
import { ExtensionsComponent } from './extensions/extensions.component';
import { SignInComponent } from './userManagment/sign-in/sign-in.component';
import { SignUpComponent } from './userManagment/sign-up/sign-up.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import { MangaDetailsComponent } from './manga-details/manga-details.component';
import { Season } from './Models/season';
import { SeasonComponent } from './anime-details/season/season.component';
import { SearchAnimeComponent } from './search/search-anime/search-anime.component';
import { SearchMangaComponent } from './search/search-manga/search-manga.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'discover', pathMatch: 'full'
    },
    {   path: 'discover', component: DiscoverComponent , 
        children: [
        {path:'',redirectTo:'anime',pathMatch:'full'},
        {    path: 'anime',component: AnimeDiscoverComponent},
        {    path: 'manga',component: MangaDiscoverComponent},
                    ],
    },
    {   path: 'search', component: SearchComponent , 
    children: [
        {path:'',redirectTo:'anime',pathMatch:'full'},
        {    path: 'anime',component: SearchAnimeComponent},
        {    path: 'manga',component: SearchMangaComponent},
                ],
    },
    {
        path:'extension', component:ExtensionsComponent
    },
    {
        path:'anime', component:AnimeDetailsComponent
    },
    {
        path:'anime/season', component:SeasonComponent
    },
    {
        path:'manga', component:MangaDetailsComponent
    },
    {
        path:'signIn', component:SignInComponent
    },
    {
        path:'signUp', component:SignUpComponent
    },

];
