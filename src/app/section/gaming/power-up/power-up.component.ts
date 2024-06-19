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
    else if (this.total > +this.user.gaming_point)
      alert("Insufficient gaming point !! Go play some quiz ")
    else {
      this.service.buy_item(this.userID, this.purchaseAmount).subscribe({
        next: () => {
          alert("Item have added to your inventory")
          this.router.navigateByUrl("/shop")
          const amount = sessionStorage.getItem('item-amount') as string
          const newAmount = Number.parseInt(amount) + this.purchaseAmount
          sessionStorage.setItem('item-amount', newAmount.toString())
        },
        error: (response) => {
          alert(response.error.failure)
          this.router.navigateByUrl('/shop')
        }
      })
    }

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
