import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
})
export class PopUpComponent {
  @Input() title: string = 'Hello!';
  @Input() message: string = 'Press ESC key or click the button below to close';
  @ViewChild('modal') modal!: ElementRef;
  @Input() isLoading:boolean=false;
  isSuccess:boolean=true;
  open() {
    this.modal.nativeElement.showModal();
    if(this.isLoading){
      this.message='Loading...'
    }
  }

  close() {
    this.modal.nativeElement.close();
    console.log(this.message)
    if(this.message=='Account deleted successfully'){
      window.location.href = '/';
    }
  }
}
