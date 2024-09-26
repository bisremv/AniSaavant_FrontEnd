import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-anime-manga-toggle',
  standalone: true,
  imports: [FormsModule ,RouterModule],
  templateUrl: './anime-manga-toggle.component.html',
  styleUrl: './anime-manga-toggle.component.scss'
})
export class AnimeMangaToggleComponent {

}
