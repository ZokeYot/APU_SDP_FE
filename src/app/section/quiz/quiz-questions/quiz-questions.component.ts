import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question } from '../../../model/quiz';

@Component({
  selector: 'app-quiz-questions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-questions.component.html',
  styleUrl: './quiz-questions.component.css'
})
export class QuizQuestionsComponent {
  @Input() questions !: Question[]
}
