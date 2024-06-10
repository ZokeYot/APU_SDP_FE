import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterModule],
=======
  imports: [CommonModule, RouterModule],
>>>>>>> 28c31999b9113fd277e3db88d7bec29e4571892e
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
   
}
