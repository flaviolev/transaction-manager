import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionMatTableComponent } from './transaction-mat-table.component';

describe('TransactionMatTableComponent', () => {
  let component: TransactionMatTableComponent;
  let fixture: ComponentFixture<TransactionMatTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionMatTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
