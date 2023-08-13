import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginStatusService } from './services/login-status.service';
import { Router } from '@angular/router'; // Import the Router service

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //if it is the login page, then hide the navbar
  

  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient, private loginStatusService: LoginStatusService, private router: Router) {}

  get isLoginPage(): boolean {
    return this.loginStatusService.getIsLoginPage();
  }
  ngOnInit(): void {
    
    if(localStorage.getItem('token')==null){
      this.router.navigate(['/']);
    }

  }
  logout(){
    localStorage.removeItem('token');

    // Navigate to the login page or wherever you want after logout
    this.router.navigate(['/']);
  }
}
