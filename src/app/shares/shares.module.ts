import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';

const shareComponent = [
  HeaderComponent,
];

@NgModule({
  declarations: shareComponent,
  imports: [ 
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: shareComponent
})

export class SharesModule { }
