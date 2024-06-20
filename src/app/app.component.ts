import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, NavigationStart, Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './section/header/header.component';
import { LecturerNavbarComponent } from './section/navbar/lecturer-navbar/lecturer-navbar.component';
import { FormsModule } from '@angular/forms';
import { StudentNavbarComponent } from './section/navbar/student-navbar/student-navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, StudentNavbarComponent, RouterModule, CommonModule, RouterOutlet, FormsModule, RouterModule, LecturerNavbarComponent]
})
export class AppComponent implements OnInit {
  title = 'SDP_FE';

  loggedIn: boolean = true;
  isStudent: boolean = true;
  isLecturer: boolean = true;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const curUrl = this.router.url;
        this.loggedIn = !(curUrl === '/register' || curUrl === '/login' || curUrl === "/profile" || curUrl === "/update-profile");

        if (this.loggedIn) {
          this.isStudent = sessionStorage.getItem('role') === 'student';
          this.isLecturer = sessionStorage.getItem('role') === 'lecturer';
        }

        if (curUrl.startsWith("/attempt-quiz")) {
          this.isStudent = false;
        }
      }


    });
  }






}
