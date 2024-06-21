import { Component } from '@angular/core';
import { TestyService } from '../../../service/testy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, Quiz } from '../../../model/quiz';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-quiz',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent {

  quizID !: string;
  quiz !: Quiz;
  imageUrl !: string;

  constructor(private service: TestyService, private router: Router, private route: ActivatedRoute) {
    this.quizID = this.route.snapshot.paramMap.get('id') as string
    this.service.get_quiz(this.quizID).subscribe(data => {
      this.quiz = data;
      this
    })
  }

  addOptions(question: any): void {
    if (question.content.options.length >= 4) {
      alert('Max 4 Options');
    } else {
      question.content.options.push('');
    }
  }

  removeOptions(question: Question): void {
    if (question.content.options.length <= 2)
      alert('Atleast 2 Options')
    else
      question.content.options.pop()
  }

  trackByIndex(index: number): number {
    return index;
  }

  isLocked(index: number): boolean {
    return index === 0;  // Lock the first input
  }

  addQuestion(): void {
    if (this.quiz.questions.length >= 10)
      alert('Max 10 Question')
    else {
      this.quiz.questions.push({
        question: '',
        type: 'True and False',
        content: {
          answer: '',
          options: []
        }
      });
    }
  }

  removeQuestion(): void {
    if (this.quiz.questions.length <= 1)
      alert("A quiz should have atleast 1 questions")
    else
      this.quiz.questions.pop()
  }


  uploadFile(): void {
    document.getElementById('thumbnail_upload')?.click();
  }

  fileUploaded(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.quiz.thumbnail = e.target.result.split(",")[1];
    };
    reader.readAsDataURL(file);
  }

  updateAnswerAndFirstOption(question: Question, answer: string) {
    question.content.answer = answer;
    if (question.content.options.length > 0) {
      question.content.options[0].option = answer;
    }
  }

  checkForm() {
    let submit = false;
    let emptyQuestion = false


    if (!this.quiz.title)
      alert('The quiz title cannot be empty !!')
    else if (!this.quiz.description)
      alert('Just put anything on the quiz description !!')
    else if (!this.imageUrl)
      alert('Upload lah a thumbnail for the quiz')

    for (let question of this.quiz.questions) {
      if (question.question.trim() === '' || question.content.answer.trim() === '') {
        alert(`Question / Answers can not be empty !! Check the question ${this.quiz.questions.indexOf(question) + 1}`)
        emptyQuestion = true
        break
      }
    }
    if (!emptyQuestion)
      this.submit()
  }

  submit() {
    this.service.update_quiz(this.quiz).subscribe({
      next: (response) => {
        alert(response.success)
        this.router.navigateByUrl('/quiz')
      },
      error: (response) => {
        alert(response.error.failure)
        this.router.navigateByUrl('/quiz')
      }
    })
  }

}
