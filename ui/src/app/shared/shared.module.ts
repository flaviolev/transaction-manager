import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { MaterialModule } from './material.module'
import { TransactionMatTableComponent } from './transaction-mat-table/transaction-mat-table.component'

@NgModule({
  declarations: [TransactionMatTableComponent],
  imports: [MaterialModule, BrowserModule, ReactiveFormsModule],
  exports: [MaterialModule, TransactionMatTableComponent, ReactiveFormsModule],
})
export class SharedModule {}
