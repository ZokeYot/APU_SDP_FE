import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { TestyService } from '../../../service/testy.service';
import { UserInfo } from '../../../model/conversation';


@Component({
  selector: 'app-power-up',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './power-up.component.html',
  styleUrl: './power-up.component.css'
})
export class PowerUpComponent {

  user !: UserInfo;
  userID: string = sessionStorage.getItem('id') as string;
  purchaseAmount: number = 0
  total !: number


  constructor(private service: TestyService, private router: Router) {
    this.service.get_profile(this.userID).subscribe(data => this.user = data)
  }

  purchase_item() {
    if (this.purchaseAmount == 0)
      alert("Nothing selected !!")
    if (this.total > +this.user.gaming_point)
      alert("Insufficient gaming point !!")

  }

  increase() {
    if (this.purchaseAmount < 100)
      this.purchaseAmount++
    else
      alert("Maximun amount is 99 !!")

    this.total = this.purchaseAmount * 500

  }
  decrease() {
    if (this.purchaseAmount >= 1)
      this.purchaseAmount--
    else
      alert("Minimun amount is 0 !!")
    this.total = this.purchaseAmount * 500
  }

}
