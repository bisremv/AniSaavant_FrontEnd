import { Component, Input, OnInit } from '@angular/core';
import { ExtensionItemComponent } from "../extension-item/extension-item.component";
import { Extension } from '../../Models/Extenison';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EmptyPageComponent } from "../../Components/empty-page/empty-page.component";

@Component({
  selector: 'app-active-extensions',
  standalone: true,
  imports: [ExtensionItemComponent, CommonModule, EmptyPageComponent],
  templateUrl: './active-extensions.component.html',
  styleUrl: './active-extensions.component.scss'
})
export class ActiveExtensionsComponent implements OnInit {
@Input() extensions:Extension[]=[] 
@Input() Name:string=""
@Input() isLoading:boolean=true
isActiveList:boolean=false
ngOnInit(){
  
  if(this.Name == "Active Extension"){
      this.isActiveList=true
    }
}
}
