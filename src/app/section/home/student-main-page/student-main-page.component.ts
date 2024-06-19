import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TestyService } from '../../../service/testy.service';
import { Quiz } from '../../../model/quiz';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-main-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './student-main-page.component.html',
  styleUrl: './student-main-page.component.css'
})
export class StudentMainPageComponent {
  userID: string = sessionStorage.getItem('id') as string
  recent_quiz: Quiz[] = []
  constructor(private service: TestyService, private router: Router) {
    if (!this.userID)
      router.navigateByUrl("/login")
    this.get_recent_quiz()
  }

  get_recent_quiz() {
    this.service.get_all_quiz().subscribe(data => this.recent_quiz = data)
  }

}
