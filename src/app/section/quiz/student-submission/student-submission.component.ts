import { Component, Input } from '@angular/core';
import { Submission } from '../../../model/submission';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-student-submission',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-submission.component.html',
  styleUrl: './student-submission.component.css'
})
export class StudentSubmissionComponent {
  @Input() submission !: Submission
}
