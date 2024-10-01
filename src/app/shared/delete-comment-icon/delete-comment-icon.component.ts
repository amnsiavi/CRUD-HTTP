import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-comment-icon',
  standalone: true,
  imports: [],
  templateUrl: './delete-comment-icon.component.html',
  styleUrl: './delete-comment-icon.component.css',
})
export class DeleteCommentIconComponent {
  get imagePath() {
    return 'delete.png';
  }
  @Output() delete = new EventEmitter<number>();
  @Input({ required: true }) userId!: number;

  onDelete() {
    console.log('User id on del comp', this.userId);
    this.delete.emit(this.userId);
  }
}
