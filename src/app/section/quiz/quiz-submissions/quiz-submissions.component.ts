import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentSubmissionComponent } from "../student-submission/student-submission.component";
import { Submission } from '../../../model/submission';

@Component({
  selector: 'app-quiz-submissions',
  standalone: true,
  templateUrl: './quiz-submissions.component.html',
  styleUrl: './quiz-submissions.component.css',
  imports: [CommonModule, StudentSubmissionComponent]
})
export class QuizSubmissionsComponent {

  @Input() submissions !: Submission[]
  displaySubmissions: boolean = false
  selectedSubmission !: any;

  showSubmission(submission: Submission) {
    this.displaySubmissions = true;
    this.selectedSubmission = submission
  }

  back() {
    this.displaySubmissions = true;
    this.selectedSubmission = null
  }


}
