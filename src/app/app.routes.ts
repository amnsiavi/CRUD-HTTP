import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddCommentsFormComponent } from './pages/add-comments-form/add-comments-form.component';
import { UpdateCommentsFormComponent } from './pages/update-comments-form/update-comments-form.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'add-comment',
    component: AddCommentsFormComponent,
  },
  {
    path: 'update-comment/:id',
    component: UpdateCommentsFormComponent,
  },
];
