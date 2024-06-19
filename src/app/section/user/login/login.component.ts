import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TestyService } from '../../../service/testy.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email !: string;
  password !: string;
  errorMessage !: string;


  constructor(private router: Router, private service: TestyService) {
    sessionStorage.clear();
  }

  login(): void {
    this.service.login(this.email, this.password).subscribe(
      {
        next: (response) => this.loginSucess(response),
        error: (response) => alert(response.error.failure)
      }
    )
  }


  loginSucess(response: any): void {
    alert("Welcome")
    sessionStorage.setItem('id', response.userID)
    sessionStorage.setItem('role', response.role)
    sessionStorage.setItem('item-amount', response.item_amount)
    this.router.navigateByUrl('/home-page')
  }

  loginFailed(response: any): void {
    this.errorMessage = response.error.failure;
  }
}

