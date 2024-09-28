import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../../../Models/image';

@Component({
  selector: 'app-image-item',
  standalone: true,
  imports: [],
  templateUrl: './image-item.component.html',
  styleUrl: './image-item.component.scss'
})
export class ImageItemComponent implements OnInit {
@Input() image: Image= new Image(0, '', 0, '', 0, 0, 0);
ngOnInit(){
}
}
