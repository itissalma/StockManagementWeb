import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];
  stockNames: string[] = []; // Array to store stock names

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.fetchOrders();
    this.fetchStockNames();
  }

  fetchOrders() {
    const authToken = localStorage.getItem('token');
    //console.log('authToken:', authToken);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    
    this.http.get<any[]>('http://localhost:5262/api/order', {headers}).subscribe(data => {
      this.orders = data;
    });
  }

  fetchStockNames() {
    const authToken = localStorage.getItem('token');
    //console.log('authToken:', authToken);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    this.http.get<any[]>('http://localhost:5262/api/Stock/GetStockName', {headers}).subscribe(data => {
      // Extract stock names from the response data
      this.stockNames = data.map(item => item.stockName);
      console.log(this.stockNames);
    });
  }
}
