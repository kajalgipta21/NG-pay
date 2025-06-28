import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MyService } from '../myservice';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deleteth',
  templateUrl: './deleteth.html',
  styleUrls: ['./deleteth.css'],
  imports: [FormsModule, HttpClientModule,FormsModule,
    ToastModule,
    TableModule,
    CardModule,
    ButtonModule,
    InputTextModule,CommonModule],
  providers:[MyService]
})
export class deleteth {
  phoneNumber: string = '';
  transactions: any[] = [];
  searched: boolean = false;
  message = '';
  success = false;
  myservice: any;

  constructor(private myervice: MyService) {}

  getTransactions() {
    this.myservice.getTransactionHistory(this.phoneNumber).subscribe({
      next: (data: any[]) => {
        this.transactions = data;
        this.searched = true;
      },
      error: (err: any) => {
        this.transactions = [];
        this.searched = true;
        console.error('Error fetching transaction history:', err);
      }
    });
  }

  deleteTransactions() {
    if (!confirm('Are you sure you want to delete all transactions for this number?')) return;

    this.myservice.deleteTransactionHistory(this.phoneNumber).subscribe({
      next: (res: any) => {
        this.message = res.message || 'Transactions deleted successfully.';
        this.success = true;
        this.transactions = [];
      },
      error: (err : any) => {
        this.message = 'Failed to delete transactions.';
        this.success = false;
      }
    });
  }
}



