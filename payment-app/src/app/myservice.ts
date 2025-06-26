import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MyService {
  
 
  private baseUrl = 'https://skytm-api.azurewebsites.net'; 

  constructor(private http: HttpClient) {}
  payMoney(data: { to: string; amount: number }): Observable<any> {
    return this.http.post(this.baseUrl+"/api/Transactions/pay", data);
  }

  addMoney(data: { amount: number; phoneNumber: string }): Observable<any> {
    return this.http.post(this.baseUrl+"/api/Wallet/add", data);  
  }
  

  getBalance(phoneNumber: string):Observable<any> {
    return this.http.get<any>(this.baseUrl+"/api/Users/balance?phoneNumber=");
  }
  getTransactionHistory(phoneNumber: string):Observable<any> {
    return this.http.get<any>(this.baseUrl+"/api/Transactions/history?phoneNumber=");
  }
  deleteTransactiongetHistory(phoneNumber: string): Observable<any> {
    return this.http.delete(this.baseUrl+"/api/Transactions/history?phoneNumber=");
  }
  register(userData: any): Observable<any> {
    return this.http.post(this.baseUrl+"/api/Auth/signup", userData);
  }
  

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(this.baseUrl+"/api/Auth/login", credentials);
  }
}