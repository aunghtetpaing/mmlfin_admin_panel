import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})

export class PostCreateComponent implements OnInit {

  formData: any = {
    title: '',
    photo: '',
    fileName: '',
    dataUrl: '',
    type: 'LiveStock',
    lang: 'English',
    description: '',
    post_date: '',
    body: ''
  }

  imageFile: any;

  constructor(
    private  snack: MatSnackBar,
    private api: ApiService,
    private datePipe: DatePipe
  ) { }

  private openSnackBar(message: string) {
    this.snack.open( message, 'Close', {
      duration: 2000
    });
  }

  private reset() {
    this.formData = {
      title: '',
      photo: '',
      fileName: '',
      dataUrl: '',
      type: 'LiveStock',
      lang: 'English',
      description: '',
      post_date: '',
      body: ''
    } 
  }

  openImage() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;

    fileUpload.onchange = () => {
      const reader = new FileReader();

      this.formData.fileName = fileUpload.files[0].name;

      if(fileUpload.files[0].type !== 'image/jpeg' && fileUpload.files[0].type !== 'image/png' && fileUpload.files[0].type !== 'image/gif') {
        return this.openSnackBar('Invalid Image File Format (ex: jpeg,png,gif');
      }

      if(fileUpload.files[0].size > 300000){
        return this.openSnackBar('Image file size must be less than 3 MB')
      }

      reader.readAsDataURL(fileUpload.files[0]);
      reader.onloadend = () => {
        this.formData.dataUrl = reader.result;
      }
    }

    fileUpload.click();
  }

  async save() {

    if(this.formData.title === '' || this.formData.dataUrl === '' || this.formData.body === '' || this.formData.description === '' || this.formData.post_date === '') {
      return this.openSnackBar('All fields are required!');
    }

    const imageUpload = await this.api.post('upload/image', this.formData).then((result) => {
      return result;
    });

    if(imageUpload.data) { 

      const body = {
        title: this.formData.title,
        photo: imageUpload.data.name,
        description: this.formData.description,
        body: this.formData.body,
        article_type: this.formData.type,
        article_language: this.formData.lang,
        post_date: this.datePipe.transform(this.formData.post_date, 'MM-dd-yyyy')
      }

      this.api.post('posts', body).then((result: any) => {
        if(result){
          this.reset();
        }
      });
    }

  }

  ngOnInit(): void {
  }


}
