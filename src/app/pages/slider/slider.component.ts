import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { element } from 'protractor';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [
    { provide: ANIMATION_MODULE_TYPE, useValue: 'BrowserAnimations'}
  ]
})
export class SliderComponent implements OnInit {

  columnsToDisplay: string[] = ['name', 'active', 'option'];
  dataSource: any;
  slider: any = {};
  previewImage: string;
  isLoading: boolean = true;

  constructor(
    private api:ApiService,
    private snackBar: MatSnackBar,
  ) { }

  private toastAlert(toastMessage: string) {
    const snackbar =  this.snackBar.open(toastMessage, 'Close', {
      duration: 3000
    });
    this.isLoading = false;
    return snackbar;
  }

  private async loadingData(): Promise<any> {
    return await this.api.get(`slider`).then((result) => {
      this.previewImage = `${environment.imageUrl}/slider/${result.data[0].name}`;
      this.dataSource = new MatTableDataSource(result.data);
      this.isLoading = false;
    }).catch((error)=> {
      if(error) {
        this.toastAlert('Somethings was wrong! Data can not retrive');
      }
    });
  }

  private async update(element: any): Promise<any> {
    return await this.api.put('slider', element).then(() => {
      this.toastAlert('Update Successfully');
    }).catch(() => {
      this.toastAlert('Update Failed');
    });
  }

  public async slideChange(element:any, event: any) {
    this.isLoading = true;
    element.active = event.checked;
    await this.update(element);
  }

  public openImage() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;

    fileUpload.onchange = () => {
      const reader = new FileReader();

      this.slider.fileName = fileUpload.files[0].name;

      if(fileUpload.files[0].type !== 'image/jpeg' && fileUpload.files[0].type !== 'image/png' && fileUpload.files[0].type !== 'image/gif') {
        return this.toastAlert('Invalid Image File Format (ex: jpeg,png,gif');
      }

      if(fileUpload.files[0].size > 300000){
        return this.toastAlert('Image file size must be less than 3 MB')
      }

      reader.readAsDataURL(fileUpload.files[0]);
      reader.onloadend = () => {
        this.slider.dataUrl = reader.result;
      }
    }

    fileUpload.click();
  }

  public toastConfirm(element: any) {
    const toast = this.snackBar.open('Are you sure want to delete?', 'Confirm', {
      duration: 3000,
    });

    toast.onAction().subscribe(() => {
      this.api.delete(`slider/${element.id}`).then((result) => {
        this.toastAlert('Deleted Successfully');
        this.loadingData();
      }).catch(() => {
        this.toastAlert('Deleted Failed');
      });
    });
  }

  public preview(name: string) {
    this.previewImage = `${environment.imageUrl}/slider/${name}`
  }

  public async create(): Promise<any> {
    this.isLoading = true;
    this.slider.slider = true;

    let imageUpload: any = {};

    if(this.slider.dataUrl === '') {
      return this.toastAlert('Image fileds is required');
    }

    if(this.slider.dataUrl) {
      imageUpload = await this.api.post('upload/image', this.slider).then((result) => {
        this.slider.photo = result.data.name;
        return result;
      });
    }

    this.api.post('slider', this.slider).then((result: any) => {
      if(result){
        this.loadingData();
        this.toastAlert('Created Successfully!');
      }
    }).catch((error) => {
      this.toastAlert('Created Failed');
    });
  }

  async ngOnInit() {
    await this.loadingData();
  }

}
