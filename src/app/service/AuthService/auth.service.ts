import { Injectable } from '@angular/core';
import { Role } from '../../model/role';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = "http://localhost:8000/login";
  private registerUrl = "http://localhost:8000/register";
  private currentUser: any;
  constructor(private client: HttpClient) {

  }

  getUserRole(): Role {
    const role = sessionStorage.getItem('role');

    if (role == "student")
      return Role.STUDENT
    else if (role == "lecturer")
      return Role.LECTURER
    else
      throw new Error("");
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.client.post<any>(this.loginUrl, { email, password }, { headers })
      .pipe(
        tap(response => {
          sessionStorage.setItem('credential', JSON.stringify(response.user.id))
          if (response.user.role == "student")
            sessionStorage.setItem('role', "student")
          else if (response.user.role == "lecturer")
            sessionStorage.setItem('role', "lecturer")
        }))
  }


}
