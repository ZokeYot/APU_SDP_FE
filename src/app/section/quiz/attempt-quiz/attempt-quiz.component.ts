import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TestyService } from '../../../service/testy.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Response } from '../../../model/submission';




@Component({
  selector: 'app-attempt-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './attempt-quiz.component.html',
  styleUrl: './attempt-quiz.component.css'
})
export class AttemptQuizComponent implements OnInit {
  quizID !: string;
  userID !: string;
  quiz !: any;
  questions !: Response[]
  useItem !: boolean

  constructor(private service: TestyService, private route: ActivatedRoute, private router: Router) {
    this.quizID = this.route.snapshot.paramMap.get('id') as string;
    this.userID = sessionStorage.getItem('id') as string;
    this.get_quiz_info()


  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.useItem = params['use'] === 'yes'
    })
  }

  get_quiz_info() {
    this.service.get_quiz(this.quizID).subscribe(data => {
      this.quiz = data
      this.questions = this.quiz.questions
    })
  }
  checkSubmission() {
    let submit = true;
    for (let question of this.questions) {
      if (!question.content.response) {
        alert(`Hello ?? The question ${this.questions.indexOf(question) + 1} is not answered !!`)
        submit = false
        break
      }
    }

    if (submit)
      this.submit()
  }

  submit() {
    const completeDate = new Date().toISOString().slice(0, 10).replaceAll("-", "");
    let score = 0;
    this.questions.forEach((question) => {
      if (question.content.answer === question.content.response)
        score += 500
    })

    alert(`Congrat!! You have answered ${score / 500} correct answer !! Earned ${this.useItem ? score * 2 : score} gaming point!!`);
    const submission = {
      "quizID": this.quizID,
      "studentID": this.userID,
      "completeDate": completeDate,
      "response": this.questions,
      "score": score,
      "gaming_point": this.useItem ? score * 2 : score
    }


    this.service.create_submission(submission).subscribe({
      next: (response) => {
        alert(response.success)
        this.router.navigateByUrl('/home-page')
      },
      error: (response) => alert(response.error.failure)
    })
    if (this.useItem) {
      this.service.use_item(this.userID).subscribe({
        next: () => {
          const amount = sessionStorage.getItem('item-amount') as string
          const newAmount = Number.parseInt(amount) - 1
          sessionStorage.setItem('item-amount', newAmount.toString())
        }
      })
    }

  }

}
