import { NgModule } from '@angular/core'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { FilterTransactionsPipe } from './filter-transactions.pipe'
import { MaterialModule } from './material.module'
import { TransactionMatTableComponent } from './transaction-mat-table/transaction-mat-table.component'

@NgModule({
  declarations: [TransactionMatTableComponent, FilterTransactionsPipe],
  imports: [MaterialModule, BrowserModule, ReactiveFormsModule, FormsModule],
  exports: [
    MaterialModule,
    TransactionMatTableComponent,
    ReactiveFormsModule,
    FilterTransactionsPipe,
    FormsModule,
  ],
})
export class SharedModule {}
