import { Component } from '@angular/core';
import { LecMainPageComponent } from "../lec-main-page/lec-main-page.component";
import { StudentMainPageComponent } from "../student-main-page/student-main-page.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  imports: [LecMainPageComponent, StudentMainPageComponent, CommonModule]
})
export class HomePageComponent {

  role: string = sessionStorage.getItem('role') as string
  userID: string = sessionStorage.getItem('id') as string


  constructor(private router: Router) {
    if (!this.userID)
      router.navigateByUrl("/login")
  }

}
