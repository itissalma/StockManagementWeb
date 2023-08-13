import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderListComponent } from '../order-list/order-list.component';
import { Router } from '@angular/router';
import { BuyStockPopupComponent } from '../buy-stock-popup/buy-stock-popup.component';
import * as signalR from '@microsoft/signalr';

import { AuthService } from '../services/auth.service';
import { JWTTokenResponse } from '../models/jwt-token-response.models';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  stocks: any[] = [];
  @ViewChild('buyButton') buyButton!: ElementRef;

  private hubConnection: signalR.HubConnection | undefined;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchStocks();

    // Set up SignalR hub connection
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7178/stockPriceHub')
      .configureLogging(signalR.LogLevel.Information)
      .build();

    // Start the hub connection
    this.hubConnection.start().then(() => {
      console.log('SignalR hub connection started');
    });

    // Listen for stock price updates from the hub
    this.hubConnection.on('ReceiveStockPriceUpdate', (stockId: number, newPrice: number) => {
      try {
        const stockToUpdate = this.stocks.find(stock => stock.stockId === stockId);
        if (stockToUpdate) {
          stockToUpdate.price = newPrice;
        }
      } catch (error) {
        console.error("Error in ReceiveStockPriceUpdate:", error);
      }
    });
  }

  fetchStocks() {
    const authToken = localStorage.getItem('token');
    //console.log('authToken:', authToken);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    
    this.http.get<any>('https://localhost:7178/api/Stock', { headers }).subscribe(data => {
      this.stocks = data;
    });
  }

  openOrderList(stock: any, event: MouseEvent) {
    const dialogRef = this.dialog.open(BuyStockPopupComponent, {
      data: { stockId: stock.stockId, price: stock.price, stockName: stock.stockName },
    });
  }
}
