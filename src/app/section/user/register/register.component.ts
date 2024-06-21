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
  confirmPassword !: string;
  checkPassword: boolean = false
  dob !: string;
  gender !: string;
  lectureKey !: string;
  errorMessage !: string;

  checkPasswordMatch() {

    if (this.password !== this.confirmPassword)
      this.checkPassword = true
    else
      this.checkPassword = false
  }


  checkForm() {
    if (!this.firstName)
      alert('You have to atleast filled up the first name field !!')
    else if (!this.email)
      alert('You have to filled up the email address field !! ')
    else if (!this.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      alert('Incorrect email format !!')
    else if (!this.password)
      alert('Password field cannot be empty !!')
    else if (!this.confirmPassword)
      alert('The confirm password filed cannot be empty !!')
    else if (this.checkPassword)
      alert('The password does not match !!')
    else if (!this.dob)
      alert('The dob field cannot be empty !! ')
    else if (!this.gender)
      alert('The gender must be select !! ')
    else if (!this.profile_picture)
      alert('How about upload a profile picture ??')
    else
      this.register()

  }




  register() {
    if (this.lastName === undefined)
      this.lastName = ""
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
      this.convertFile(file)
    }
  }

  convertFile(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result as string;
      this.profile_picture = this.imageUrl.split(',')[1];
    };
  }
}
