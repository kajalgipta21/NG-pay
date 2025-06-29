import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MyService, TransactionModel } from '../myservice';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seeth',
  templateUrl: './seeth.html',
  styleUrls: ['./seeth.css'],
  standalone: true, 
  imports: [FormsModule,
    HttpClientModule,
    CommonModule,
    
  ],
  providers: [MyService]
})
export class Seeth {
  phoneNumber: string = '';
  transactions: any[] = [];
  searched: boolean = false;
  TransactionModel: TransactionModel = new TransactionModel;

  constructor(private myservice: MyService) {}

  getTransactions() {
    this.myservice.getTransactionHistory(this.TransactionModel).subscribe({
      next: (data) => {
       
        this.transactions = data.result;
        this.searched = true;
      },
      error: (err) => {
        this.transactions = [];
        this.searched = true;
        console.error('Error fetching transaction history:', err);
      }
    });
  }
}
