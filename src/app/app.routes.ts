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
import { ExtensionPageComponent } from './extensions/extension-page/extension-page.component';
import { LibraryComponent } from './library/library.component';
import { LibraryAnimeComponent } from './library/library-anime/library-anime.component';
import { LibraryMangaComponent } from './library/library-manga/library-manga.component';
import { last } from 'rxjs';
import { LatestComponent } from './latest/latest.component';
import { PageComponent } from './manga-details/page/page.component';
import { SettingsComponent } from './settings/settings.component';
import { AccountManageComponent } from './settings/account-manage/account-manage.component';
import { StatsticsComponent } from './settings/statstics/statstics.component';
import { ExploreAnimeComponent } from './explore-anime/explore-anime.component';
import { StreamComponent } from './stream/stream.component';

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
        path:'anime/stream', component:StreamComponent
    },
    {
        path:'extension/page',component:ExtensionPageComponent
    },
    {
        path:'anime', component:AnimeDetailsComponent
    },
    {
        path:'explore', component:ExploreAnimeComponent
    },
    {
        path:'library', component:LibraryComponent,
        children: [
            {path:'',redirectTo:'anime',pathMatch:'full'},
            {    path: 'anime',component: LibraryAnimeComponent},
            {    path: 'manga',component: LibraryMangaComponent},
                    ],
        
    },
    {
        path:'latest', component:LatestComponent,
        children: [
            {path:'',redirectTo:'anime',pathMatch:'full'},
            {    path: 'anime',component: LibraryAnimeComponent},
            {    path: 'manga',component: LibraryMangaComponent},
                    ],
        
    },
    {
        path:'anime/season', component:SeasonComponent
    },
    {
        path:'manga', component:MangaDetailsComponent
    },
    {
        path:'manga/page', component:PageComponent
    },
    {
        path:'signIn', component:SignInComponent
    },
    {
        path:'signUp', component:SignUpComponent
    },
    {
        path:'setting', component:SettingsComponent,
        children: [
            {path:'',redirectTo:'account',pathMatch:'full'},
            {    path: 'account',component: AccountManageComponent},
            {    path: 'stats',component: StatsticsComponent},
                    ],
    },

];
