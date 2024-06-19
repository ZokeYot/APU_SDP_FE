import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-navbar.component.html',
  styleUrl: './student-navbar.component.css'
})
export class StudentNavbarComponent implements OnInit {
  viewQuiz!: boolean;
  viewShop!: boolean;
  viewConversation!: boolean;
  viewMaterial!: boolean;

  quizUrl = ["/quiz", "/quiz/"];
  shopUrl = ["/shop", "/gacha", "/power-up"];
  conversationUrl = ["/conversation", "/new-conversation", "/new-group"];
  materialUrl = ['/materials']

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const curUrl = this.router.url;

        this.viewQuiz = this.quizUrl.find(url => (curUrl == url || curUrl.startsWith(url))) != null
        this.viewShop = this.shopUrl.find(url => url == curUrl) != null
        this.viewConversation = this.conversationUrl.find(url => url == curUrl) != null
        this.viewMaterial = this.materialUrl.find(url => url == curUrl) != null
      }
    });
  }


}
