import { Component } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MyService } from '../myservice';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkb',
  templateUrl: './checkb.html',
  imports: [FormsModule, HttpClientModule,
      ToastModule,
      TableModule,
      CardModule,
      ButtonModule,
      InputTextModule,CommonModule],
      providers:[MyService]
})
export class Checkb {
  phoneNumber: string = '';
  balance: number | null = null;
  message = '';
  success = false;

  constructor(private myservice: MyService) {}

  checkBalance() {
    this.myservice.getBalance(this.phoneNumber).subscribe({
      next: (res: any) => {
        this.balance = res.balance;
        this.message = 'Balance fetched successfully!';
        this.success = true;
      },
      error: (err: { error: { message: string; }; }) => {
        this.balance = null;
        this.message = err.error?.message || 'Failed to fetch balance.';
        this.success = false;
      }
    });
  }
}



