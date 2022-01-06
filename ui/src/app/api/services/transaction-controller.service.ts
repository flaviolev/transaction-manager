/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllTransactions
   */
  static readonly GetAllTransactionsPath = '/api/transaction';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTransactions()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTransactions$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Transaction>>> {

    const rb = new RequestBuilder(this.rootUrl, TransactionControllerService.GetAllTransactionsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Transaction>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllTransactions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTransactions(params?: {
  }): Observable<Array<Transaction>> {

    return this.getAllTransactions$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Transaction>>) => r.body as Array<Transaction>)
    );
  }

  /**
   * Path part for operation addTransaction
   */
  static readonly AddTransactionPath = '/api/transaction';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addTransaction()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addTransaction$Response(params: {
    body: Transaction
  }): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, TransactionControllerService.AddTransactionPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addTransaction$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addTransaction(params: {
    body: Transaction
  }): Observable<{
}> {

    return this.addTransaction$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

}
