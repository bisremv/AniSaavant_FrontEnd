import { Component, inject, OnInit } from '@angular/core';
import { UserManagmentService } from '../../Service/user-managment.service';
import { UserStats } from '../../Models/stats';

@Component({
  selector: 'app-statstics',
  standalone: true,
  imports: [],
  templateUrl: './statstics.component.html',
  styleUrl: './statstics.component.scss'
})
export class StatsticsComponent implements OnInit {
  userManagement:UserManagmentService=inject(UserManagmentService);
  userStats:UserStats=new UserStats({})
  ngOnInit(): void {
    this.getStats()
  }
getStats(){
this.userManagement.getUserStats().subscribe((response)=>{
  this.userStats=response as UserStats;
});
}

timeSpentOnAnime:{
  years:number,
  months:number,
  days:number,
}={
  years: 0,
  months: 0,
  days: 0
}
changeMinToYears(){
  let min = this.userStats.totalTimeOnAnime;
  let years = Math.floor(min/525600);
  let months = Math.floor((min%525600)/43800);
  let days = Math.floor(((min%525600)%43800)/1440);
  return {years,months,days}
}
changeMangaMinToYears(){
  let min = this.userStats.totalTimeOnManga;
  let years = Math.floor(min/525600);
  let months = Math.floor((min%525600)/43800);
  let days = Math.floor(((min%525600)%43800)/1440);
  return {years,months,days}
}
sortAnimeGenresByPopularity(rank:number) {
  // Convert the object into an array of key-value pairs
  const genreArray = Object.entries(this.userStats.fevGenreAnime);
  
  // Sort the array based on the values (from highest to lowest)
  genreArray.sort((a, b) => b[1] - a[1]); // b[1] is the value
  
  return genreArray[rank-1][0]; // Returns a sorted array of key-value pairs
}
sortMangaGenresByPopularity(rank:number) {
  // Convert the object into an array of key-value pairs
  const genreArray = Object.entries(this.userStats.fevGenreManga);
  
  // Sort the array based on the values (from highest to lowest)
  genreArray.sort((a, b) => b[1] - a[1]); // b[1] is the value
  
  return genreArray[rank-1][0]; // Returns a sorted array of key-value pairs
}
}
