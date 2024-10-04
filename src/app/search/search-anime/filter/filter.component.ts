import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { studioData } from '../../../Models/studioData';
import { Filter } from '../../../Models/SearchFilter';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  @Output() filtersApplied = new EventEmitter<any>();
  activeRoute:ActivatedRoute=inject(ActivatedRoute)
  studios=studioData;
  search:string=''; // Search input
  status: string[] = ['returning', 'production', 'planned', 'canceled', 'ended']; // List of available status
  country: string[] = ['Japan', 'Korea', 'China']; // List of available countries
  selectedCountry: string[]=[]; // Selected country
  ageRating:string[]=['tv-y7','tv-g','tv-pg','tv-14','tv-ma','nr']
  selectedStatus: string = ""; // Selected status
  selectedMaxYears: number=0;
  selectedMinYears: number=0;
  selectedRating:string[]=[];
  selectedStudio:number[]=[]
  minValueRuntime: number = 0;
  maxValueRuntime: number = 0;
  tmdbRatingMin: number = 0;
  tmdbRatingMax:number=10;
  imdbRatingMin: number = 0;
  imdbRatingMax: number = 10;
  rtRatingMax: number = 10;
  rtRatingMin: number = 0;
  filterOptions:Filter={
    search: this.search,
    maxYear: this.selectedMaxYears,
    minYear: this.selectedMinYears,
    country: this.selectedCountry,
    studio: this.selectedStudio,
    status:this.selectedStatus,
    ageRating: this.selectedRating,
    minValueRuntime: this.minValueRuntime,
    maxValueRuntime: this.maxValueRuntime,
    tmdbRatingMin: this.tmdbRatingMin,
    tmdbRatingMax: this.tmdbRatingMax,
    imdbRatingMin: this.imdbRatingMin,
    imdbRatingMax: this.imdbRatingMax,
    rtRatingMin: this.rtRatingMin,
    rtRatingMax: this.rtRatingMax
  };

  ngOnInit(): void {
  
    this.activeRoute.queryParams.subscribe((params)=>{
      this.search=params['search']
    });
    this.applyFilters();
  }


  onYearChange(): void {
    if (this.selectedMinYears > this.selectedMaxYears) {
      this.selectedMinYears = this.selectedMaxYears;
    }
    // Ensure the range is valid: maxValue should not be less than minValue
    if (this.selectedMaxYears < this.selectedMinYears) {
      this.selectedMaxYears = this.selectedMinYears;
    }
  }


  isCountrySelected(country: string): boolean {
    return this.selectedCountry.includes(country);
  }


  OnCountryChange(event: any, country: string): void {
    if (event.target.checked) {
      // Add the country if selected
      this.selectedCountry.push(country);
    } else {
      // Remove the country if deselected
      this.selectedCountry = this.selectedCountry.filter((c) => c !== country);
    }
    console.log('Selected country:', this.selectedCountry);
  }


  isStudioSelected(studio: {studio:string,trakt_id:number}): boolean {
    return this.selectedStudio.includes(studio.trakt_id);
  }


  OnStudioChange(event:any,studio:{studio:string,trakt_id:number}){
    if(event.target.checked){
      this.selectedStudio.push(studio.trakt_id)
    }
    else{
      this.selectedStudio=this.selectedStudio.filter((s)=> s !== studio.trakt_id)
    }
    console.log(this.selectedStudio)
  }


  checkRuntime() {
    // Ensure the range is valid: minValue should not exceed maxValue
    if (this.minValueRuntime > this.maxValueRuntime) {
      this.minValueRuntime = this.maxValueRuntime;
    }
    // Ensure the range is valid: maxValue should not be less than minValue
    if (this.maxValueRuntime < this.minValueRuntime) {
      this.maxValueRuntime = this.minValueRuntime;
    }   
  }

  isRatingSelected(rating:string):boolean{
    return this.selectedRating.includes(rating)
  }

  onRatingChange(event:any,rating:string){
    if(event.target.checked){
      this.selectedRating.push(rating)
    }
    else{
      this.selectedRating=this.selectedRating.filter((r)=> r !== rating)
    }
    console.log(this.selectedRating)
  }
  
  isStatusSelected(arg0: string) {
    return this.selectedStatus===arg0;
  }
    OnStatusChange($event: any,arg1: string) {
    if($event.target.checked){
      this.selectedStatus = arg1;
    }
    else{
      this.selectedStatus=""
    }
    console.log(this.selectedStatus)
  }
  

  checkScoreRating(){
    if(this.tmdbRatingMin>this.tmdbRatingMax){
      this.tmdbRatingMin=this.tmdbRatingMax
    }
    if(this.imdbRatingMin>this.imdbRatingMax){
      this.imdbRatingMin=this.imdbRatingMax
    }
    if(this.rtRatingMin>this.rtRatingMax){
      this.rtRatingMin=this.rtRatingMax
    }
  }


  applyFilters(){
      this.filterOptions = {
      search: this.search,
      maxYear:this.selectedMaxYears,
      minYear:this.selectedMinYears,
      country:this.selectedCountry,
      status:this.selectedStatus,
      studio:this.selectedStudio,
      ageRating:this.selectedRating,
      minValueRuntime: this.minValueRuntime,
      maxValueRuntime: this.maxValueRuntime,
      tmdbRatingMin: this.tmdbRatingMin,
      tmdbRatingMax: this.tmdbRatingMax,
      imdbRatingMin: this.imdbRatingMin,
      imdbRatingMax: this.imdbRatingMax,
      rtRatingMin: this.rtRatingMin,
      rtRatingMax: this.rtRatingMax
    };
    // console.log('Filters applied:', filterOptions);
    // Emit the filter options to the parent
    this.filtersApplied.emit(this.filterOptions);
  } 


}
