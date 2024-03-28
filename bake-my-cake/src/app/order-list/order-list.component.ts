import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../models/order';
import { DessertService } from '../services/dessert.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  //initialize the displayed columns as array of type string; each string used to define the each columns of the table
  displayedColumns: string[] = ['id', 'orderDate', 'customerName', 'customerEmail', 'customerPhone', 'customerAddress','dessert', 'dessertName', 'quantity', 'totalPrice'];

  //define the order requests as empty array of type Order
  orderRequests: Order[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<Order>;

  constructor(private dessertService: DessertService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.dessertService.getOrders().subscribe({
      next: data => {
        this.orderRequests = data;  //get the all orders from the server and assign it to order request array
        this.dataSource = new MatTableDataSource(this.orderRequests);
        this.dataSource.paginator = this.paginator; // Attach paginator to the data source
        this.dataSource.sort = this.sort;  // Attach sorting to the data source
      },
      error: err => {
        this._snackBar.open('Failed to Fetch Order list Due to Server Error !! Please Try Again Later', 'Failure', {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-accent']
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
