import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliderRoutingModule } from './slider-routing.module';
import { SliderComponent } from './slider.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [SliderComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SliderRoutingModule
  ]
})
export class SliderModule { }
