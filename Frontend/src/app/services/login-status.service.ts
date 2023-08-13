import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginStatusService {
  private isLoginPage: boolean = false;

  setIsLoginPage(value: boolean): void {
    this.isLoginPage = value;
  }

  getIsLoginPage(): boolean {
    return this.isLoginPage;
  }
}
