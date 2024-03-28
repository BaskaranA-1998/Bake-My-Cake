import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dessert } from '../models/dessert';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class DessertService {

  desserts_url: string = "http://localhost:3000/desserts";
  orders_url: string = "http://localhost:3001/orders";

  constructor(private http: HttpClient) { }

  //method to get all the desserts from the server
  getDesserts(): Observable<Array<Dessert>> {
    return this.http.get<Array<Dessert>>(this.desserts_url);
  }

  //method to get the specific dessert from the server based on id
  getDessert(id?: number): Observable<Dessert> {
    return this.http.get<Dessert>(`${this.desserts_url}/${id}`);
  }

  //method to get all the orders from the server
  getOrders(): Observable<Array<Order>> {
    return this.http.get<Array<Order>>(this.orders_url);
  }

  //method to get the specific Order from the server based on id
  getOrder(id?: number): Observable<Order> {
    return this.http.get<Order>(`${this.orders_url}/${id}`);
  }

  //method to post the new order to the server
  postOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.orders_url,order);
  }

}
