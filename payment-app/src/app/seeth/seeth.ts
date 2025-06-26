import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MyService } from '../myservice';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seeth',
  templateUrl: './seeth.html',
  styleUrls: ['./seeth.css'],
  standalone: true, 
  imports: [
  
    HttpClientModule,
    CommonModule,
    
  ],
  providers: [MyService]
})
export class Seeth {
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
        this.transactions = [];
        this.searched = true;
        console.error('Error fetching transaction history:', err);
      }
    });
  }
}
