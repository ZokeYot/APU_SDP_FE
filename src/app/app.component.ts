import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './section/header/header.component';
import { LecturerNavbarComponent } from './section/lectuerer/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { StudentNavbarComponent } from "./section/student/navbar/navbar.component";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, StudentNavbarComponent, RouterModule, CommonModule, RouterOutlet, FormsModule, RouterModule, LecturerNavbarComponent]
})
export class AppComponent {
  title = 'SDP_FE';
  loggedIn = true;
  isStudent = false;
  isLecturer = true;






}
