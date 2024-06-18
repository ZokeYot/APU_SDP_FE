import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestyService } from '../../../service/testy.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Response } from '../../../model/submission';




@Component({
  selector: 'app-attempt-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attempt-quiz.component.html',
  styleUrl: './attempt-quiz.component.css'
})
export class AttemptQuizComponent {
  quizID !: string;
  userID !: string;
  quiz !: any;
  questions !: Response[]

  constructor(private service: TestyService, private route: ActivatedRoute, private router: Router) {
    this.quizID = this.route.snapshot.paramMap.get('id') as string;
    this.userID = sessionStorage.getItem('id') as string;
    this.get_quiz_info()
  }

  get_quiz_info() {
    this.service.get_quiz(this.quizID).subscribe(data => {
      this.quiz = data
      this.questions = this.quiz.questions
    })
  }


  submit() {
    const completeDate = new Date().toISOString().slice(0, 10).replaceAll("-", "");
    let score = 0;
    this.questions.forEach((question) => {
      if (question.content.answer === question.content.response)
        score += 500
    })

    alert(`Congrat!! You have answered ${score / 500} correct answer !! Earned ${score} gaming point!!`);
    const submission = {
      "quizID": this.quizID,
      "studentID": this.userID,
      "completeDate": completeDate,
      "response": this.questions,
      "score": score
    }
    console.log(submission)
    this.service.create_submission(submission).subscribe({
      next: (response) => {
        alert(response.success)
        this.router.navigateByUrl('/home-page')
      },
      error: (response) => alert(response.error.failure)
    })

  }

}
