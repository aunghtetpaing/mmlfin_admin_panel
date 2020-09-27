import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  mainMenu: any = [
    {
      name: "Post",
      icon: "",
      url: "",
    }
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigate = (url:string) => {
    this.router.navigate([url]);
  }
}
