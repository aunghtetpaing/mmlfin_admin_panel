import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { PostModule } from './pages/post/post.module';
import { SharesModule } from './shares/shares.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { AdsModule } from './pages/ads/ads.module';
import { SliderModule } from './pages/slider/slider.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    RouterModule,
    SharesModule,
    PostModule,
    DashboardModule,
    AdsModule,
    SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
