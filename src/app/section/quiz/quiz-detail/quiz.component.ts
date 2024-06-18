import { Component } from '@angular/core';
import { TestyService } from '../../../service/testy.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuizQuestionsComponent } from "../quiz-questions/quiz-questions.component";
import { QuizSubmissionsComponent } from "../quiz-submissions/quiz-submissions.component";
import { Submission } from '../../../model/submission';


@Component({
  selector: 'app-quiz',
  standalone: true,
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
  imports: [CommonModule, QuizQuestionsComponent, RouterModule, QuizSubmissionsComponent]
})
export class QuizComponent {
  quizID !: string
  userID !: string
  quiz !: any
  role !: string
  quizAdmin !: string
  quizStatus !: string;
  submissions !: Submission[];
  showQuestion: boolean = false
  showSubmission: boolean = true


  constructor(private service: TestyService, private route: ActivatedRoute, private router: Router) {
    this.quizID = this.route.snapshot.paramMap.get('id') as string
    this.role = sessionStorage.getItem('role') as string
    this.userID = sessionStorage.getItem('id') as string
    this.get_quiz();
    this.check_quiz();
    this.service.get_quiz_submission(this.quizID).subscribe(data => this.submissions = data)
  }

  get_quiz() {
    this.service.get_quiz(this.quizID).subscribe(data => {
      this.quiz = data
      this.service.get_profile(this.quiz.quizAdmin).subscribe(data => {
        this.quizAdmin = data.name
      })
    })
  }

  check_quiz() {
    this.service.find_quiz_participant(this.quizID, this.userID).subscribe({
      next: () => this.quizStatus = "Join",
      error: () => this.quizStatus = "Attempt"
    })
  }

  join_quiz() {
    if (this.quizStatus === "Join")
      this.service.join_quiz(this.quizID, this.userID).subscribe({
        next: () => {
          alert("Joinned Quiz Successfully")
          window.location.reload()
        },
        error: () => alert("Failed to join quiz")
      })
    else
      this.router.navigateByUrl(`/attempt-quiz/${this.quizID}`)
  }

  show_questions() {
    this.showQuestion = !this.showQuestion
  }

  show_submissions() {
    this.showSubmission = !this.showSubmission
  }

  update_quiz() {
    this.router.navigateByUrl(`/quiz/update/${this.quizID}`)
  }

  add_student() {
    this.router.navigateByUrl(`/quiz/add-student/${this.quizID}`)
  }

  delete_student() {
    this.router.navigateByUrl(`/quiz/delete-student/${this.quizID}`)
  }
}
