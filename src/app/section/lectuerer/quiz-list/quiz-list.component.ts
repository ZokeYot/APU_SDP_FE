import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, ModalComponent, RouterModule],
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent {
  isModalOpen = false;
  modalContent: string = '';
  quizId: string = '';

  openModal(content: string, quizId: string) {
    this.modalContent = content;
    this.quizId = quizId;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onViewParticipants() {
    this.isModalOpen = false;
  }
}
