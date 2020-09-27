import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PostElements {
  id: number;
  title: string;
  photo: string;
  description: string;
  body: string;
  article_language: string;
  article_type: string;
  post_date: string;
  active: boolean;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [
    { provide: ANIMATION_MODULE_TYPE, useValue: 'BrowserAnimations'}
  ]
})

export class PostComponent implements OnInit, AfterViewInit {

  columnsToDisplay: string[] = [ 'id', 'title', 'article_type', 'article_language', 'active', 'post_date'];
  dataSource: any;
  pageSizeOptions= [5,10,25,50,100];
  filter: any = {
    lang: 'English',
  }

  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private api: ApiService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {}

  private async getPosts() {
    this.isLoading = true;

    return await this.api.get(`posts?app=admin&lang=${this.filter.lang}`).then((result) => {
      this.dataSource = new MatTableDataSource(result.data.list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;

      return result.data;

    }).catch((error) => {
      this.isLoading = false;
      this.snackBar.open("Network Error! Can't load data. Please check your internet connection", 'close', {
        duration: 2000
      })
      return [];
    })
  }

  public async langChange(event: any) {
    this.filter.lang = event.value;
    return this.getPosts();
  }

  public navigate(url: string, queryData?: any) {
    this.route.navigate([url], {queryParams: {data: queryData}});
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  async ngOnInit() { }

  async ngAfterViewInit() {
    await this.getPosts();
  }

}
