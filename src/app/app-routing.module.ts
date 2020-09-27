import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule )
  },

  {
    path: 'posts',
    loadChildren: () => import('./pages/post/post.module').then((m) => m.PostModule)
  },

  {
    path: 'ads',
    loadChildren: () => import('./pages/ads/ads.module').then((m) => m.AdsModule)
  },

  {
    path: 'slider',
    loadChildren: () => import('./pages/slider/slider.module').then((m) => m.SliderModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
