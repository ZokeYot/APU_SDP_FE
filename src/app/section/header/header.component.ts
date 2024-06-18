import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TestyService } from '../../service/testy.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userID: string = sessionStorage.getItem('id') as string
  imageUrl !: string
  constructor(private service: TestyService) {

  }
  ngOnInit(): void {
    this.service.get_profile(this.userID).subscribe(data => this.imageUrl = data.profile_picture)
  }


}
