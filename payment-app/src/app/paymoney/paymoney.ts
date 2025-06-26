import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyService } from '../myservice';

@Component({
  selector: 'app-paymoney',
  templateUrl: './paymoney.html',
  styleUrls: ['./paymoney.css'],
  imports: [
    FormsModule,
    HttpClientModule,CommonModule
  ],
  providers:[MyService]
})
export class PayMoney {
  payment = {
    senderPhone: '',
    receiverPhone: '',
    amount: 0
  };

  message = '';
  success = false;

  constructor(private http: HttpClient) {}

  payMoney() {
    const apiUrl = 'https://skytm-api.azurewebsites.net/api/Transactions/pay'; 
    this.http.post(apiUrl, this.payment).subscribe({
      next: (res: any) => {
        this.message = res.message || 'Payment successful!';
        this.success = true;
      },
      error: (err) => {
        this.message = err.error?.message || 'Payment failed. Please try again.';
        this.success = false;
      }
    });
  }
}



