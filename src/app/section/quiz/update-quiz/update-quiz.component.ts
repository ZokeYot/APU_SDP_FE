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
      console.log(this.quiz)
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
