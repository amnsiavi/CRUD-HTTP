import { Component } from '@angular/core';

@Component({
  selector: 'app-add-comment-icon',
  standalone: true,
  imports: [],
  templateUrl: './add-comment-icon.component.html',
  styleUrl: './add-comment-icon.component.css',
})
export class AddCommentIconComponent {
  get imagePath() {
    return 'plus.png';
  }
}
