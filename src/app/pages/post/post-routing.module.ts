import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostViewComponent } from './post-view/post-view.component';

const routes: Routes = [
  {
    path: '',
    component: PostComponent
  },

  {
    path: 'create',
    component: PostCreateComponent
  },

  {
    path: ':id',
    component: PostViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
