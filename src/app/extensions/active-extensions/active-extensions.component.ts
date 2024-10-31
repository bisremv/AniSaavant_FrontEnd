import { Component, Input, OnInit } from '@angular/core';
import { ExtensionItemComponent } from "../extension-item/extension-item.component";
import { Extension } from '../../Models/Extenison';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-active-extensions',
  standalone: true,
  imports: [ExtensionItemComponent,CommonModule],
  templateUrl: './active-extensions.component.html',
  styleUrl: './active-extensions.component.scss'
})
export class ActiveExtensionsComponent implements OnInit {
@Input() extensions:Extension[]=[] 
@Input() Name:string=""
@Input() isLoading:boolean=false
isActiveList:boolean=false
ngOnInit(){
  console.log(this.isLoading)
  if(this.Name == "Active Extension"){
      this.isActiveList=true
    }
}
}
