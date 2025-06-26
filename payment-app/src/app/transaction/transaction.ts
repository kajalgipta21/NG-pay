import { Component } from '@angular/core';
import { MyService } from '../myservice';

@Component({
  selector: 'app-transaction',
  imports: [],
  templateUrl: './transaction.html',
  styleUrl: './transaction.css',
  providers:[MyService]
})
export class Transaction {
 
  
    phoneNumber: string = '';
    transactions: any[] = [];
    searched: boolean = false;
  
    constructor(private myservice: MyService) {}
  
    getTransactions() {
      this.myservice.getTransactionHistory(this.phoneNumber).subscribe({
        next: (data) => {
          this.transactions = data;
          this.searched = true;
        },
        error: (err) => {
          console.error('Error fetching history:', err);
          this.transactions = [];
          this.searched = true;
        }
      });
    }
  }
  

