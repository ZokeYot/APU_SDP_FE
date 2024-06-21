import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestyService } from '../../../service/testy.service';
import { Route, Router } from '@angular/router';

interface QuestionOption {
  option: string;
}

interface QuestionContent {
  answer: string;
  options?: QuestionOption[];
}

interface Question {
  question: string;
  type: string;
  content: QuestionContent;
}


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

  constructor(private service: TestyService, private router: Router) {
  }

  title: string = '';
  description: string = '';
  imageUrl: string = '';
  questions: any[] = [{
    question: '',
    type: 'True and False',
    options: ['', ''],
    answer: ''
  }];
  quizAdmin: string = sessionStorage.getItem('id') as string; // example value

  addOptions(question: any): void {
    if (question.options.length >= 4) {
      alert('Max 4 Options');
    } else {
      question.options.push('');
    }
  }

  removeOptions(question: any): void {
    if (question.options.length <= 2)
      alert('Should have atleast 2 options ')
    else
      question.options.pop()
  }

  trackByIndex(index: number): number {
    return index;
  }

  isLocked(index: number): boolean {
    return index === 0;  // Lock the first input
  }

  addQuestion(): void {
    this.questions.push({
      question: '',
      type: 'True and False',
      options: ['', ''],
      answer: ''
    });
  }

  removeQuestion(): void {
    if (this.questions.length <= 1)
      alert("A quiz should have atleast 1 questions")
    else
      this.questions.pop()
  }
  checkForm() {
    let submit = false;
    let emptyQuestion = false

    if (!this.title)
      alert('The quiz title cannot be empty !!')
    else if (!this.description)
      alert('Just put anything on the quiz description !!')
    else if (!this.imageUrl)
      alert('Upload lah a thumbnail for the quiz')

    for (let question of this.questions) {
      if (question.question.trim() === '' || question.answer.trim() === '') {
        alert(`Question / Answers can not be empty !! Check the question ${this.questions.indexOf(question) + 1}`)
        emptyQuestion = true
        break
      }
    }
    if (!emptyQuestion)
      this.submit()
  }

  submit(): void {
    const createDate = new Date().toISOString().slice(0, 10).replaceAll("-", "");
    const formattedQuestions: Question[] = this.questions.map(q => ({
      question: q.question,
      type: q.type,
      content: {
        answer: q.answer,
        options: q.type === 'Mutiple Choice' ? [
          { option: q.answer },
          ...q.options.slice(1).map((opt: string) => ({ option: opt }))
        ] : undefined
      }
    }));

    const payload = {
      title: this.title,
      quizAdmin: this.quizAdmin,
      description: this.description,
      thumbnail: this.imageUrl.split(",")[1],
      createDate: createDate,
      questions: formattedQuestions
    };


    this.service.create_quiz(payload).subscribe({
      next: (response) => this.createQuizSuccess(response),
      error: (response) => this.createQuizFailed(response)
    })

  }

  createQuizSuccess(response: any) {
    alert(response.success);
    this.router.navigateByUrl("/home-page")
  }

  createQuizFailed(response: any) {
    alert("Failed to create quiz")
    this.router.navigateByUrl("/home-page")
  }

  uploadFile(): void {
    document.getElementById('thumbnail_upload')?.click();
  }

  fileUploaded(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}