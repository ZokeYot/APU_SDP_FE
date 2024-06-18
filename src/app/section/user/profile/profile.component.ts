import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TestyService } from '../../../service/testy.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user!: any;
  imageUrl  !: string;
  role !: string;

  constructor(private service: TestyService, private router: Router) {

  }
  ngOnInit(): void {
    this.getProfile();
  }



  getProfile() {
    if (!sessionStorage.getItem('id')) {
      alert("User ID not found in the session !! Navigate to the login page")
      this.router.navigateByUrl("/login");
    }

    const userID = sessionStorage.getItem('id') as string;
    this.service.get_profile(userID).subscribe(
      data => {
        this.user = data;
        this.imageUrl = "data:image/jpeg;base64," + this.user.profile_picture
        this.role = sessionStorage.getItem('role') as string
      }
    )
  }

  back() {
    this.router.navigateByUrl('/home-page')
  }

}
