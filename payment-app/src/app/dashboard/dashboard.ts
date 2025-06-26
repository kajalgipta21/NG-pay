import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MyService } from '../myservice';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  providers: [MessageService,MyService],
 
  imports: [
    HttpClientModule,RouterLink,
    FormsModule,
    ToastModule,
    TableModule,
    CardModule,
    ButtonModule,
    InputTextModule,RouterLink,
  ]
})
export class Dashboard {
  }

  

