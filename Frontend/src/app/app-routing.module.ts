import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { AppComponent } from './app.component';
import { OrderListComponent } from './order-list/order-list.component'; 
import { BuyStockPopupComponent } from './buy-stock-popup/buy-stock-popup.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';

const routes: Routes = [{
  path: 'stock', component: StockDetailsComponent 
},
{
  path: 'orders', component: OrderListComponent
},
{
   path: 'buy/:stockId/:price', component: BuyStockPopupComponent
},
{
    path: '', component: LoginComponent,pathMatch:"full"
},{
  path: '**', component: LoginComponent
},
{
    path: 'create-account', component: CreateAccountComponent
}
//default route to ''

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
