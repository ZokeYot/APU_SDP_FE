import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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
    console.log(11111)
    this.closeModal.emit();
  }

  toggleParticipants() {
    this.showParticipants = !this.showParticipants;

  }
}
