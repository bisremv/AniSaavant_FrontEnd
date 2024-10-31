import { Injectable } from '@angular/core';
import { PopUpComponent } from '../Components/pop-up/pop-up.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor() { }

  private popup!: PopUpComponent;

  registerModal(modal: PopUpComponent) {
    this.popup = modal;
  }

  openPopup(title: string, message: string, type:boolean,isLoading:boolean=false) {
    this.popup.title = title;
    this.popup.message = message;
    this.popup.isSuccess=type;
    this.popup.isLoading=isLoading;
    this.popup.open();
  }

  closePopup() {
    this.popup.close();
    
  }
}
