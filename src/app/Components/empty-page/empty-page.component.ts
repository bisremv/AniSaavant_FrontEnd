import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-empty-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './empty-page.component.html',
  styleUrl: './empty-page.component.scss'
})
export class EmptyPageComponent {

}
