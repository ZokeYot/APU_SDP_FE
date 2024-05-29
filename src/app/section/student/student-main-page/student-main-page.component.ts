import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuizzesComponent } from "../quizzes/quizzes.component";
import { ConversationComponent } from "../conversation/conversation.component";
import { ShopComponent } from "../shop/shop.component";

@Component({
  selector: 'app-student-main-page',
  standalone: true,
  templateUrl: './student-main-page.component.html',
  styleUrl: './student-main-page.component.css',
  imports: [CommonModule, QuizzesComponent, ConversationComponent, ShopComponent]
})
export class StudentMainPageComponent {
  quizPage = true;
  shopPage = false;
  conversationPage = false;

  switchPage(page: String) {
    switch (page) {
      case "quiz":
        this.shopPage = false;
        this.conversationPage = false;
        this.quizPage = true;
        break;
      case "shop":
        this.shopPage = true;
        this.conversationPage = false;
        this.quizPage = false;
        break;
      case "conversation":
        this.shopPage = false;
        this.conversationPage = true;
        this.quizPage = false;
    }
  }
}
