import { Component, inject, DestroyRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Comments } from '../../Types/app.model';
import { Router } from '@angular/router';

//Components
import { SucessMessageComponent } from '../../shared/sucess-message/sucess-message.component';
@Component({
  selector: 'app-add-comments-form',
  standalone: true,
  imports: [FormsModule, SucessMessageComponent],
  templateUrl: './add-comments-form.component.html',
  styleUrl: './add-comments-form.component.css',
})
export class AddCommentsFormComponent {
  private apiService = inject(ApiService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  postIdField = '1';
  nameField = '';
  emailField = '';
  commentField = '';

  isSucess = false;

  onSucess() {
    this.isSucess = true;
    setTimeout(() => {
      this.isSucess = false;
      this.router.navigate(['']);
    }, 3000);
  }

  onSubmit() {
    const data: Comments = {
      id: Math.floor(Math.random() * 20),
      postId: parseInt(this.postIdField),
      name: this.nameField,
      email: this.emailField,
      body: this.commentField,
    };
    const subscription = this.apiService.addComment(data).subscribe({
      complete: () => {
        this.onSucess();
      },
      error: (error) => {
        console.dir('Error', error);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  onCancel() {
    this.router.navigate(['']);
  }
}
