import { NgModule } from '@angular/core'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { FilterTransactionsPipe } from './filter-transactions.pipe'
import { MaterialModule } from './material.module'
import { TransactionMatTableComponent } from './transaction-mat-table/transaction-mat-table.component'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [TransactionMatTableComponent, FilterTransactionsPipe],
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, FormsModule],
  exports: [
    MaterialModule,
    TransactionMatTableComponent,
    ReactiveFormsModule,
    FilterTransactionsPipe,
    FormsModule,
    CommonModule,
  ],
})
export class SharedModule {}
