import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestyService } from '../../../service/testy.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.css'
})
export class QuizListComponent {
  quizzes: any[] = []
  lecturerQuizzes: any[] = []
  userID: string = sessionStorage.getItem('id') as string
  role: string = sessionStorage.getItem('role') as string
  filterQuizzes = [...this.quizzes]
  filterLecturerQuizzes = [...this.lecturerQuizzes]
  searching !: string

  constructor(private service: TestyService, private router: Router) {
    this.service.get_all_quiz().subscribe(data => this.quizzes = data)
    this.service.get_lecturer_quiz(this.userID).subscribe(data => this.lecturerQuizzes = data)
  }

  searchQuiz(event: Event) {
    const inputElement = event.target as HTMLInputElement
    const searchValue = inputElement.value
    this.filterQuizzes = this.quizzes.filter(quiz =>
      quiz.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    this.filterLecturerQuizzes = this.lecturerQuizzes.filter(quiz =>
      quiz.title.toLowerCase().includes(searchValue.toLowerCase())
    )
  }

}
