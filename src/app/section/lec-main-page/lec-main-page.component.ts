import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TestyService } from '../../service/testy.service';
import { Quiz } from '../../model/quiz';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lec-main-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './lec-main-page.component.html',
  styleUrl: './lec-main-page.component.css'
})
export class LecMainPageComponent {
  role: string = sessionStorage.getItem('role') as string
  userID: string = sessionStorage.getItem('id') as string
  recent_quiz !: Quiz[]


  constructor(private service: TestyService, private router: Router) {
    if (!this.userID)
      router.navigateByUrl("/login")

    this.get_recent_quiz()
  }

  get_recent_quiz() {
    this.service.get_all_quiz().subscribe(data => this.recent_quiz = data)
  }

}
