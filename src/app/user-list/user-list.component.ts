import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: User[] = []

  constructor(private UserService: UserService) {
  }

  ngOnInit(): void {
    this.get_all_user()
  }

  private get_all_user() {
    this.UserService.getUserList().subscribe(data => {
      this.users = data
    })
  }

  // private get_Users() {
  //   fetch("http://localhost:8000/user/all")
  //     .then(response => response.json())
  //     .then(data => {
  //       this.users = data
  //       this.users.forEach(user => {

  //         //renderData(user)

  //         let element = document.createElement('div');

  //         element.className = "container"
  //         document.body.appendChild(element)

  //         let name = document.createElement('h1')
  //         name.textContent = user.firstName + " " + user.lastName
  //         element.appendChild(name)

  //         let email = document.createElement('h2')
  //         email.textContent = user.email
  //         element.appendChild(email)

  //       })
  //     })
  // }

  private renderData(user: User) {
    let element = document.createElement('div');

    element.className = "container"
    document.body.appendChild(element)

    let name = document.createElement('h1')
    name.textContent = user.firstName + " " + user.lastName
    element.appendChild(name)

    let email = document.createElement('h2')
    email.textContent = user.email
    element.appendChild(email)

  }




}
