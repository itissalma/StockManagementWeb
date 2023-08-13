import { Component, OnInit } from '@angular/core';
import { LoginStatusService } from '../services/login-status.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import the Router service

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = '';
  userName = '';
  NatID = '';
  successMessage = '';
  formData: any = {};
  formControls: any = {};

  createAccountForm!: FormGroup;

  constructor(
    private loginStatusService: LoginStatusService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router // Inject the Router service

  ) {}

  onSubmit() {
    if (this.createAccountForm.valid) {
      const registerData = {
        username: this.createAccountForm.value.username,
        natID: this.createAccountForm.value.natID,
        email: this.createAccountForm.value.email,
        password: this.createAccountForm.value.password,
      };

      const apiUrl = 'https://localhost:7178/api/User/register';

      this.http.post<any>(apiUrl, registerData).subscribe(
        (response) => {
          this.errorMessage = '';
          console.log('Registration successful:', response);
          this.successMessage = 'Registration successful!'; // Set success message
          //wait 3 seconds then redirect to login page
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['']);
          }
          , 3000);
          
        },
        (error) => {
          console.error('Registration failed:', error);
          //this.errorMessage = 'Registration failed!'; // Set error message
          this.errorMessage = 'Email or National ID already exists!'; // Set error message
          
        }
      );
    }
  }

  ngOnInit(): void {
    this.loginStatusService.setIsLoginPage(true);
    this.createAccountForm = this.fb.group({
      username: ['', Validators.required],
      natID: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
    this.formControls = this.createAccountForm.controls;
  }

  ngOnDestroy(): void {
    this.loginStatusService.setIsLoginPage(false);
  }
}
