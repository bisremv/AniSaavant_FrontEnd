import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../../../Models/image';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-item.component.html',
  styleUrl: './image-item.component.scss'
})
export class ImageItemComponent implements OnInit {
@Input() image: Image= new Image(0, '', 0, '', 0, 0, 0);
@Input() type: string = '';
ngOnInit(){
}
}
