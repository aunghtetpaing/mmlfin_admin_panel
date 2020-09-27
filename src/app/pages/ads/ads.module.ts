import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdsRoutingModule } from './ads-routing.module';
import { AdsComponent } from './ads.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdsComponent],
  imports: [
    CommonModule,
    AdsRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class AdsModule { }
