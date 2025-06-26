import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  private baseUrl = 'https://skytm-api.azurewebsites.net';

  constructor(private http: HttpClient) {}

  // Add money
  addMoney(data: { amount: number; phoneNumber: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Wallet/add`, data);
  }

  // Pay money
  payMoney(data: { to: string; amount: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Transactions/pay`, data);
  }

  // Get balance
  getBalance(phoneNumber: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Users/balance?phoneNumber=${phoneNumber}`);
  }

  // Get transaction history
  getTransactionHistory(phoneNumber: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Transactions/history?phoneNumber=${phoneNumber}`);
  }

  // Delete transaction history
  deleteTransactionHistory(phoneNumber: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/Transactions/history?phoneNumber=${phoneNumber}`);
  }

  // Register user
  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Auth/signup`, userData);
  }

  // Login user
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Auth/login`, credentials);
  }
}
