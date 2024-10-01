import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Comments } from '../../Types/app.model';
import { FormsModule } from '@angular/forms';
import { DestroyRef } from '@angular/core';
import { SucessMessageComponent } from '../../shared/sucess-message/sucess-message.component';
@Component({
  selector: 'app-update-comments-form',
  standalone: true,
  imports: [FormsModule, SucessMessageComponent],

  templateUrl: './update-comments-form.component.html',
  styleUrl: './update-comments-form.component.css',
})
export class UpdateCommentsFormComponent {
  private router = inject(Router);
  private apiService = inject(ApiService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  isSucess = false;

  onSucess() {
    this.isSucess = true;
    setTimeout(() => {
      this.isSucess = false;
      this.router.navigate(['']);
    }, 3000);
  }
  id!: number;
  selectedComment: Comments = {
    id: 0,
    postId: 0,
    name: '',
    email: '',
    body: '',
  };

  //Binded Inputs
  postIdField = this.selectedComment.postId;
  nameField = this.selectedComment.name;
  emailField = this.selectedComment.email;
  commentField = this.selectedComment.body;

  ngOnInit(): void {
    let paramId: string | null =
      this.activatedRoute.snapshot.paramMap.get('id');

    if (paramId) {
      this.id = parseInt(paramId);
    }

    this.apiService.getSpecificComment(this.id);
    const subscription = this.apiService.oberver2$.subscribe((val) => {
      this.selectedComment = val;
      console.log('The selected Comment', this.selectedComment);
    });
    this.postIdField = this.selectedComment.postId;
    this.nameField = this.selectedComment.name;
    this.emailField = this.selectedComment.email;
    this.commentField = this.selectedComment.body;
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  onSubmit() {
    const updatedComment = {
      id: this.selectedComment.id,
      postId: this.postIdField,
      name: this.nameField,
      email: this.emailField,
      body: this.commentField,
    };
    const subscription = this.apiService
      .updateComment(this.id, updatedComment)
      .subscribe({
        error: (error) => {
          console.log('Error', error);
        },
        complete: () => {
          this.onSucess();
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
