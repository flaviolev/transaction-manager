import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { DashboardComponent } from './dashboard.component'
import { LatestTransactionsComponent } from './latest-transactions/latest-transactions.component'
import { NewPaymentComponent } from './new-payment/new-payment.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [
    DashboardComponent,
    NewPaymentComponent,
    LatestTransactionsComponent,
  ],
  imports: [SharedModule, BrowserModule],
  exports: [
    DashboardComponent,
    NewPaymentComponent,
    LatestTransactionsComponent,
  ],
})
export class DashboardModule {}
