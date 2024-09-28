import { Component, Input } from '@angular/core';
import { ProductionCompany } from '../../../Models/ProductionCompany';

@Component({
  selector: 'app-studio-item',
  standalone: true,
  imports: [],
  templateUrl: './studio-item.component.html',
  styleUrl: './studio-item.component.scss'
})
export class StudioItemComponent {
@Input() company: ProductionCompany = new ProductionCompany(0, "", "", "");
imagePlaceHolder: string = "images/image_placeholder.svg";

setPlaceholder(event: any) {
  event.target.src = this.imagePlaceHolder; // Path to your placeholder image
}
}
