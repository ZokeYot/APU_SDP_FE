import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestyService } from '../../../service/testy.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.css'
})
export class QuizListComponent {
  quizzes: any[] = []
  role: string = sessionStorage.getItem('role') as string
  filterQuizzes = [...this.quizzes]

  constructor(private service: TestyService, private router: Router) {
    this.service.get_all_quiz().subscribe(data => this.quizzes = data)
  }

  searchQuiz(event: Event) {
    const inputElement = event.target as HTMLInputElement
    const searchValue = inputElement.value
    this.filterQuizzes = this.quizzes.filter(quiz =>
      quiz.title.toLowerCase().includes(searchValue.toLowerCase())
    )
  }

}
