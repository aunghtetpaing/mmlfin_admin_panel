import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';

import { PostRoutingModule } from './post-routing.module';
import { MaterialModule } from 'src/app/material/material.module';

import { PostComponent } from './post.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostViewComponent } from './post-view/post-view.component';

@NgModule({
  declarations: [PostComponent, PostCreateComponent, PostViewComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    MaterialModule,
    FormsModule,
    QuillModule.forRoot(),
  ],
  providers: [
    DatePipe
  ]
})
export class PostModule { }
