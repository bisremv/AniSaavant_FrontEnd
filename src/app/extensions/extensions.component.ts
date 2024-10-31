import { Component, inject, OnInit } from '@angular/core';
import { ExtensionItemComponent } from "./extension-item/extension-item.component";
import { CommonModule } from '@angular/common';
import { ExtensionService } from '../Service/extension.service';
import { Extension } from '../Models/Extenison';
import { ActiveExtensionsComponent } from "./active-extensions/active-extensions.component";
import { Console } from 'console';
import { UserManagmentService } from '../Service/user-managment.service';

@Component({
  selector: 'app-extensions',
  standalone: true,
  imports: [ExtensionItemComponent, CommonModule, ActiveExtensionsComponent],
  templateUrl: './extensions.component.html',
  styleUrl: './extensions.component.scss'
})
export class ExtensionsComponent implements OnInit {
  activeExtensions:Extension[]=[]
  deActivatedExtension:Extension[]=[]
  extensionService:ExtensionService=inject(ExtensionService)
  userService:UserManagmentService=inject(UserManagmentService)
  
  ngOnInit(): void {
    this.extensionService.getAllExtensionList().subscribe(
      {
        next:(res)=>{
          this.deActivatedExtension=res as Extension[];
        },
        error:(err)=>{
        },
        complete:()=>{
        }
      }
    )
    this.extensionService.getActiveExtensionList().subscribe(
      {
        next:(res)=>{
          this.activeExtensions=res as Extension[];
          this.deActivatedExtension = this.deActivatedExtension.filter(
            (item) => !this.activeExtensions.some(extension => item.exId === extension.exId)
        );
        },
        error:(err)=>{
        },
        complete:()=>{
        }
      }
    )
  }
}