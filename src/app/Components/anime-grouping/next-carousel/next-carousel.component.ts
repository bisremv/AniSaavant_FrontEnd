import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-next-carousel',
  standalone: true,
  imports: [],
  templateUrl: './next-carousel.component.html',
  styleUrl: './next-carousel.component.scss'
})
export class NextCarouselComponent {
  @Input() 
  Direction: number=0;
  @Output() ArrowDirection = new EventEmitter<number>();

  Onclick() {
    this.ArrowDirection.emit(this.Direction);
  }
  
}
