import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { MaterialModule } from './material.module'
import { TransactionMatTableComponent } from './transaction-mat-table/transaction-mat-table.component'

@NgModule({
  declarations: [TransactionMatTableComponent],
  imports: [MaterialModule, BrowserModule],
  exports: [MaterialModule, TransactionMatTableComponent],
})
export class SharedModule {}
