import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TestyService } from '../../../service/testy.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private service: TestyService, private router: Router) {

  }

  imageUrl: string = '../../../../assets/img/user.png';
  profile_picture !: string;
  fileInput !: string;
  firstName !: string;
  lastName !: string;
  email !: string;
  password !: string;
  dob !: string;
  gender !: string;
  lectureKey !: string;
  errorMessage !: string;




  register() {
    const name = this.firstName + " " + this.lastName
    const dob = this.dob.replaceAll("-", "")
    this.service.register(name, this.email, this.password, this.gender, dob, this.profile_picture, this.lectureKey)
      .subscribe(
        {
          next: (response) => this.registerSuccess(response),
          error: (response) => { alert(response.error.failure || "Failed to register") }
        }
      )

  }

  registerSuccess(response: any) {
    alert(response.success);
    this.router.navigateByUrl("/login");
  }

  uploadFile() {
    const fileInput = document.getElementById("image-upload") as HTMLInputElement;
    fileInput.click();
  }

  fileUploaded(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.profile_picture = this.imageUrl.split(',')[1];
      };
    }
  }
}
