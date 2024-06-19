import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-lecturer-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './lecturer-navbar.component.html',
  styleUrls: ['./lecturer-navbar.component.css']
})
export class LecturerNavbarComponent implements OnInit {

  viewQuiz: boolean = this.router.url === '/quiz';
  viewMaterial: boolean = this.router.url === '/materials';
  viewConversation: boolean = this.router.url === '/conversation';

  quizUrl = ["/quiz", "/create-quiz"];
  materialUrl = ["/materials"];
  conversationUrl = ["/conversation", "/new-conversation", "/new-group"]
  constructor(private router: Router) {

  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const curUrl = this.router.url;

        this.viewQuiz = this.quizUrl.find(url => url == curUrl) != null
        this.viewMaterial = this.materialUrl.find(url => url == curUrl) != null
        this.viewConversation = this.conversationUrl.find(url => url == curUrl) != null
      }
    });
  }
} 
