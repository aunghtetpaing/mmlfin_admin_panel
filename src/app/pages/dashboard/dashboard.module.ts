import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { SharesModule } from 'src/app/shares/shares.module';
import { MaterialModule } from 'src/app/material/material.module';

import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharesModule,
  ]
})
export class DashboardModule { }
