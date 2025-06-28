import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  private baseUrl = 'https://skytm-api.azurewebsites.net';

  constructor(private http: HttpClient) {}
  getBalance(PhoneNumber: string, Password: string):Observable<any> {
    return this.http.get<any>(this.baseUrl+"/api/Users/balance?phoneNumber=");
  }
 
  addMoney(data: { amount: number; phoneNumber: string }): Observable<any> {
    return this.http.post<any>(this.baseUrl+"/api/Wallet/add", data);
  }

  
  payMoney(data: { to: string; amount: number }): Observable<any> {
    return this.http.post(this.baseUrl+"/api/Transactions/pay", data);
  }

 
  
  
  getTransactionHistory(phoneNumber: string): Observable<any> {
    return this.http.get(this.baseUrl+"/api/Transactions/history?phoneNumber=${phoneNumber}");
  }

 
  deleteTransactionHistory(phoneNumber: string): Observable<any> {
    return this.http.delete(this.baseUrl+"/api/Transactions/history?phoneNumber=${phoneNumber}");
  }

  
  register(userData: any): Observable<any> {
    return this.http.post(this.baseUrl+"/api/Auth/signup", userData);
  }


  login(credentials: { phonenumber: string; password: string }): Observable<any> {
    return this.http.post(this.baseUrl+"/api/Auth/login", credentials);
  }
  }
