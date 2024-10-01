import { Inject, Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

//Types
import { type Comments } from '../Types/app.model';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/comments';
  observer$ = new BehaviorSubject<Comments[]>([]);
  oberver2$ = new BehaviorSubject<Comments>({
    id: 0,
    postId: 0,
    name: '',
    email: '',
    body: '',
  });
  private httpClient = inject(HttpClient);
  private comments = signal<Comments[]>([]);

  public isFetching = signal<boolean>(true);

  private fetch(url: string) {
    return this.httpClient.get<Comments[]>(url);
  }

  //Loading and Emitting Api Users
  loadComments() {
    if (this.comments().length === 0) {
      this.fetch(this.apiUrl).subscribe({
        next: (value: Comments[]) => {
          this.comments.set(value.splice(0, 5));
          this.observer$.next(this.comments());
        },
        error: (error) => {
          console.error('Error fetching comments:', error);
        },
        complete: () => {
          this.isFetching.update((prev) => false);
        },
      });
    } else {
      this.observer$.next(this.comments());
    }
  }

  deleteComment(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/{id}`);
  }

  addComment(commentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.post(this.apiUrl, commentData, { headers });
  }
  getSpecificComment(id: number) {
    const currentComment = this.comments().find((val) => val.id === id);
    if (currentComment) {
      this.oberver2$.next(currentComment);
    } else {
      this.oberver2$.next({
        id: 0,
        postId: 0,
        name: '',
        email: '',
        body: '',
      });
    }
  }
  updateComment(id: number, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.put(`${this.apiUrl}/${id}`, data, { headers });
  }
}
