import { Component } from '@angular/core';

@Component({
  selector: 'app-update-icon',
  standalone: true,
  imports: [],
  templateUrl: './update-icon.component.html',
  styleUrl: './update-icon.component.css',
})
export class UpdateIconComponent {
  get imagePath() {
    return 'update2.png';
  }
}
