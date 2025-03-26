import { inject, Injectable } from '@angular/core';
import { Order } from '../models/order.type';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


//const API_URL = 'https://ng-json-api-production.up.railway.app/orders';
const API_URL = "http://localhost:3000/orders";



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  http = inject(HttpClient);

  constructor() { }


  proceedToCheckout(order: Order): Observable<Order> {
    return this.http.post<Order>(API_URL, order);
  }

}
