import {
  Component,
  inject,
  DestroyRef,
  OnInit,
  signal,
  OnDestroy,
} from '@angular/core';
import { ApiService } from '../services/api.service';
import { Comments } from '../Types/app.model';
import { RouterLink } from '@angular/router';

//Components
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { AddCommentIconComponent } from '../shared/add-comment-icon/add-comment-icon.component';
import { DeleteCommentIconComponent } from '../shared/delete-comment-icon/delete-comment-icon.component';
import { SucessMessageComponent } from '../shared/sucess-message/sucess-message.component';
import { UpdateIconComponent } from '../shared/update-icon/update-icon.component';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    LoadingSpinnerComponent,
    RouterLink,
    AddCommentIconComponent,
    DeleteCommentIconComponent,
    SucessMessageComponent,
    UpdateIconComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  private apiService = inject(ApiService);
  private destroyRef = inject(DestroyRef);

  isFetching = this.apiService.isFetching;
  data = signal<Comments[]>([]);
  sucess = false;

  onSucess() {
    this.sucess = true;
    setTimeout(() => {
      this.sucess = false;
    }, 3000);
  }

  ngOnInit(): void {
    this.apiService.loadComments();
    const subscription = this.apiService.observer$.subscribe((value) => {
      this.data.set(value);
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  deleteComment(id: number) {
    const subscription = this.apiService.deleteComment(id).subscribe({
      error: (err) => {
        console.dir('Error in Table', err);
      },
      complete: () => {
        this.onSucess();
      },
    });
  }
}
