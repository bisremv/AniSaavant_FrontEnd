import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarPageHIdeService {

  constructor() { }
  isNavOpen = new BehaviorSubject<boolean>(true);
// just a fake git hub hit map

  openNAv() {
    this.isNavOpen.next(true);
  }

  closeNav() {
    this.isNavOpen.next(false);
  }
  isOpen(){
    return this.isNavOpen.value;
  }
}
