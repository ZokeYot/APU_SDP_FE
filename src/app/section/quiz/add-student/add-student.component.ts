import { Component } from '@angular/core';
import { TestyService } from '../../../service/testy.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Participant, Student } from '../../../model/user';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {

  quizID !: string;
  students !: Student[]
  selectedStudents: Participant[] = []

  constructor(private service: TestyService, private router: Router, private route: ActivatedRoute) {
    this.quizID = this.route.snapshot.paramMap.get('id') as string
    this.service.get_all_student().subscribe(data => this.students = data)
  }

  toggleSelected(student: Student) {
    const index = this.findIndex(student.id)


    if (index === -1)
      this.selectedStudents.push({ studentID: student.id })
    else
      this.selectedStudents.splice(index, 1)
  }

  findIndex(studentID: string) {
    return this.selectedStudents.findIndex((s) => s.studentID === studentID)
  }

  addStudent() {
    this.service.add_quiz_participants(this.quizID, this.selectedStudents).subscribe({
      next: (response) => {
        alert(response.success);
        this.router.navigateByUrl(`/quiz/${this.quizID}`)
      },
      error: (response) => {
        alert(response.error.failure);
        this.router.navigateByUrl(`/quiz/${this.quizID}`)
      }
    })
  }

}
