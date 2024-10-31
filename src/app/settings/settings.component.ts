import { Component, inject, OnInit } from '@angular/core';
import { AccountManageComponent } from "./account-manage/account-manage.component";
import {  ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ AccountManageComponent,RouterModule , CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  route:Router=inject(Router)
  isAccount:boolean=true;
  activatedRoute:ActivatedRoute=inject(ActivatedRoute)
 
}
