import { Component, Input } from '@angular/core';
import { Submission } from '../../../model/submission';


@Component({
  selector: 'app-student-submission',
  standalone: true,
  imports: [],
  templateUrl: './student-submission.component.html',
  styleUrl: './student-submission.component.css'
})
export class StudentSubmissionComponent {
  @Input() submission !: Submission
}
