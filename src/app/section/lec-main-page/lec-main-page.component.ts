import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lec-main-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './lec-main-page.component.html',
  styleUrl: './lec-main-page.component.css'
})
export class LecMainPageComponent {
  role: string = sessionStorage.getItem('role') as string

}
