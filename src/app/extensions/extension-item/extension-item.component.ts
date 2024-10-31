import { Component, inject, Input } from '@angular/core';
import { Extension } from '../../Models/Extenison';
import { CommonModule } from '@angular/common';
import { ExtensionService } from '../../Service/extension.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-extension-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './extension-item.component.html',
  styleUrl: './extension-item.component.scss'
})
export class ExtensionItemComponent {
  @Input()
  ext:Extension=new Extension(0,"","","")
  @Input() 
  isActiveList:boolean=false;
  routes:Router=inject(Router);
  extension:ExtensionService=inject(ExtensionService)
  ngOnInit(){
    console.log("extItem",this.ext)
  }
  ActivateExtension() {
    this.extension.activateExtension(this.ext.exId).subscribe({
      next: (value) => {
      },
      error: (error) => {
        // Handle errors here
        console.error("Error activating extension:", error);
      },
      complete: () => {
        // Handle completion here
        console.log("Extension activated successfully!");
      }
    });
  }
  RemoveExtension() {
    this.extension.removeExtension(this.ext.exId).subscribe(
      {
        next:(res)=>{
          console.log(res)
        }
      }
    )
  }
  navigateToExtension()
  {
    this.routes.navigate(['extension/page'], { queryParams: { extId: this.ext.exId } });
  }
}
