import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() modalContent: string = '';
  @Input() quizId: string = '';
  @Output() closeModal = new EventEmitter<void>();
  showParticipants = false;

  close() {
    this.closeModal.emit();
  }

  toggleParticipants() {
    this.showParticipants = !this.showParticipants;
  }
}
