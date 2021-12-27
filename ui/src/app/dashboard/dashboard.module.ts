import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { DashboardComponent } from './dashboard.component'
import { LatestTransactionsComponent } from './latest-transactions/latest-transactions.component'
import { NewPaymentComponent } from './new-payment/new-payment.component'
import { SharedModule } from '../shared/shared.module'
import { ReactiveFormsModule } from '@angular/forms'
import { TransactionsComponent } from '../transactions/transactions.component'
import { DashboardRoutingModule } from './dashboard-routing.module'

@NgModule({
  declarations: [
    DashboardComponent,
    NewPaymentComponent,
    LatestTransactionsComponent,
    TransactionsComponent,
  ],
  imports: [SharedModule, ReactiveFormsModule, DashboardRoutingModule],
  exports: [
    DashboardComponent,
    NewPaymentComponent,
    LatestTransactionsComponent,
  ],
})
export class DashboardModule {}
