import { Component } from '@angular/core';
import { TestyService } from '../../service/testy.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private service: TestyService, private router: Router) {
    if (!sessionStorage.getItem('id'))
      router.navigateByUrl('/login')
  }


}
