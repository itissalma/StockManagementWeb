import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import the HttpClient module
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-buy-stock-popup',
  templateUrl: './buy-stock-popup.component.html',
  styleUrls: ['./buy-stock-popup.component.css'],
})
export class BuyStockPopupComponent implements OnInit {
  stockData: any;
  quantity: number = 0; // Default quantity
  totalPrice: number = 0;
  @ViewChild('confirmationMessage', { static: false }) confirmationMessage!: ElementRef;
  showConfirmation: boolean = false; // Initialize to false
  showFailed: boolean = false; // Initialize to false

  constructor(
    private dialogRef: MatDialogRef<BuyStockPopupComponent>,
    private route: ActivatedRoute,
    private http: HttpClient, // Inject the HttpClient service
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    const stockId = this.data?.stockId;
    const stockPrice = this.data?.price;
    const stockName = this.data?.stockName;

    this.stockData = {
      stockId: stockId,
      price: stockPrice,
      stockName: stockName
    };
  }

  calculateTotalPrice() {
    this.totalPrice = this.quantity * this.stockData.price;
  }

  closePopup() {
    this.dialogRef.close();
  }

  buyStock() {
    const authToken = localStorage.getItem('token');
    //console.log('authToken:', authToken);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    if (this.quantity <= 0) {
      console.log("failed son");
      this.showFailed = true;
      return;
    } else {
      const order = {
        stockId: this.stockData.stockId,
        userName: 'salmaaly', // Replace with the actual username
        price: this.stockData.price,
        quantity: this.quantity,
      };


      const apiUrl = `https://localhost:7178/api/Order/createOrder?stockId=${order.stockId}&userName=${order.userName}&price=${order.price}&quantity=${order.quantity}`;

      this.http.post<any>(apiUrl, null, {headers}).subscribe(
        (response) => {
          this.showConfirmation = true;
          this.showFailed = false;
          setTimeout(() => {
            this.showConfirmation = false;
            this.showFailed = false;
            this.closePopup();
          }, 5000);
        },
        (error) => {
          console.error('Error creating order:', error);
          this.showFailed = true;
        }
      );
    }
  }
}