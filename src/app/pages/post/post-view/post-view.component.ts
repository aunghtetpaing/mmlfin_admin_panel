import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})

export class PostViewComponent implements OnInit {

  public post: any = {};
  public isLoading: boolean = true;

  constructor(
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    private snackbar: MatSnackBar,
    private datePipe: DatePipe
  ) { }

  private openSnackBar(message: string) {
    this.snackbar.open( message, 'Close', {
      duration: 2000
    });
  }

  private async loadingData() {
    return await this.api.get(`posts/${this.activeRoute.snapshot.params.id}`).then((result) => {
      result.data.photo =  `${environment.imageUrl}/${result.data.photo}`;
      result.data.post_date = new Date(result.data.post_date).toISOString();
      this.post = result.data;
      this.isLoading = false;
      return result.data;

    }).catch((error) => {
      this.isLoading = false;
      return null;
    });
  }

  public imageFailed(element: any) {
    element.photo = `${environment.imageUrl}/${environment.defaultImage}`;
  }

  public stripHtml(html: any) {
    var tmp = document.createElement("div");
    tmp.innerHTML = html;
    this.post.body = tmp.textContent || tmp.innerText || "";
  }

  public openImage() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;

    fileUpload.onchange = () => {
      const reader = new FileReader();

      this.post.fileName = fileUpload.files[0].name;

      if(fileUpload.files[0].type !== 'image/jpeg' && fileUpload.files[0].type !== 'image/png' && fileUpload.files[0].type !== 'image/gif') {
        return this.openSnackBar('Invalid Image File Format (ex: jpeg,png,gif');
      }

      if(fileUpload.files[0].size > 300000){
        return this.openSnackBar('Image file size must be less than 3 MB')
      }

      reader.readAsDataURL(fileUpload.files[0]);
      reader.onloadend = () => {
        this.post.dataUrl = reader.result;
      }
    }

    fileUpload.click();
  }

  async update() {
    this.isLoading = true;

    if(this.post.title === '' || this.post.dataUrl === '' || this.post.body === '' || this.post.description === '' || this.post.post_date === '') {
      return this.openSnackBar('All fields are required!');
    }

    let imageUpload: any = {};
    let body: any = {};


    body.id = this.post.id;
    body.title = this.post.title;
    body.photo = this.post.photo;
    body.description = this.post.description;
    body.body = this.post.body;
    body.article_type = this.post.article_type;
    body.article_language = this.post.article_language;
    body.post_date = this.datePipe.transform(this.post.post_date, 'MM-dd-yyyy');
    body.active = this.post.active;

    if(this.post.dataUrl) {
      imageUpload = await this.api.post('upload/image', this.post).then((result) => {
        return result;
      });
    }

    if(imageUpload.data) { 
      body.photo = imageUpload.data.name;
    }

    this.api.put('posts', body).then((result: any) => {
      if(result){
        this.isLoading = false;
        this.snackbar.open('Update Success', 'close', {
          duration: 2000
        });
      }
    }).catch((error) => {
      this.isLoading = false;
    });

  }

  async ngOnInit() {
    await this.loadingData();
  }

}
