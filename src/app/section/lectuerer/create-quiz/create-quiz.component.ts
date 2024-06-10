import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Question } from '../../../model/question';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css'
})
export class CreateQuizComponent {
  trueFalseQuestion: boolean = true;
  mutipleChoiceQuestion: boolean = false;
  codingQuestion: boolean = false;

  questions: Question[] = []

  constructor() {
    this.addQuestion();
    console.log(this.questions)
  }

  addQuestion(): void {
    this.questions.push(new Question('', 'True and False', new Blob(), '', {}))
  }

}
