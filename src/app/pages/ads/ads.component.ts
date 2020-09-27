import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {

  isLoading: boolean = true;
  imagePath: string = `${environment.imageUrl}/ads/`;

  adsHeader: any = {};
  adsFullWith: any = {};
  adsBlockStart: any = {};
  adsBlockMiddle: any = {};
  adsBlockEnd: any = {};
  adsSide: any = {};

  constructor(
    private snack: MatSnackBar,
    private api: ApiService
  ) { }

  private openSnackBar(message: string) {
    this.snack.open( message, 'Close', {
      duration: 2000
    });
  }

  private async loadingData(): Promise<any> {
    return await this.api.get('ads').then((result) => {

      result.data.filter((value: any) => {

        if(value.id === 1) {
          this.adsHeader = value;
          this.adsHeader.fileName = value.photo;
          this.adsHeader.isLoading = false;
        }

        if(value.id === 2) {
          this.adsFullWith = value;
          this.adsFullWith.fileName = value.photo;
          this.adsFullWith.isLoading = false;
        }

        if(value.id === 3) {
          this.adsBlockStart = value;
          this.adsBlockStart.fileName = value.photo;
          this.adsBlockStart.isLoading = false;
        }

        if(value.id === 4) {
          this.adsBlockMiddle = value;
          this.adsBlockMiddle.fileName = value.photo;
          this.adsBlockMiddle.isLoading = false;
        }

        if(value.id === 5) {
          this.adsBlockEnd = value;
          this.adsBlockEnd.fileName = value.photo;
          this.adsBlockEnd.isLoading = false;
        }

        if(value.id === 6) {
          this.adsSide = value;
          this.adsSide.fileName = value.photo;
          this.adsSide.isLoading = false;
        }
      });

      this.isLoading = false;
    }).catch((error) => {
      this.isLoading = false;
    });
  }

  public imageFailed(element: any) {
    element.photo = '';
    element.photo = `${environment.imageUrl}/${environment.defaultImage}`;
  }

  public openImage(element: any) {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;

    fileUpload.onchange = () => {
      const reader = new FileReader();

      if(fileUpload.files.length > 0) {
        element.fileName = fileUpload.files[0].name;
      }

      if(fileUpload.files.length > 0 && (fileUpload.files[0].type !== 'image/jpeg' && fileUpload.files[0].type !== 'image/png' && fileUpload.files[0].type !== 'image/gif')) {
        return this.openSnackBar('Invalid Image File Format (ex: jpeg,png,gif');
      }

      if(fileUpload.files.length > 0 && fileUpload.files[0].size > 300000){
        return this.openSnackBar('Image file size must be less than 3 MB')
      }

      if(fileUpload.files.length > 0) {
        reader.readAsDataURL(fileUpload.files[0]);
        reader.onloadend = () => {
          element.dataUrl = reader.result;
        }
      }

    }

    fileUpload.click();
  }

  public async update(type: string, selectedAds: any) {
    if(selectedAds.dataUrl === '') {
      return this.openSnackBar('Image File is required');
    }

    let imageUpload: any = {};

    selectedAds.isLoading = true;
    selectedAds.ads_type = type;

    if(selectedAds.dataUrl) {
      imageUpload = await this.api.post('upload/image', selectedAds).then((result) => {
        return result;
      });
    }

    if(imageUpload.data) { 
      selectedAds.photo = imageUpload.data.name;
    }

    this.api.put('ads', selectedAds).then((result: any) => {
      if(result){
        selectedAds.dataUrl = '';
        this.snack.open('Update Success', 'close', {
          duration: 2000
        });
        selectedAds.isLoading = false;
      }
    }).catch((error) => {
      selectedAds.isLoading = false;
    });

  }

  async ngOnInit() {
    await this.loadingData();
  }

}
