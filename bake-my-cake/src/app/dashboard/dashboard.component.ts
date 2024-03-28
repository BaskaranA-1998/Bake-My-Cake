import { Component, OnInit } from '@angular/core';
import { DessertService } from '../services/dessert.service';
import { Dessert } from '../models/dessert';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //define desserts as empty array of type Dessert
  desserts: Dessert[] = [];

  //define a filterCat as empty string
  filterCat: string = "";

  ngOnInit(): void {
    //get all the desserts from the server when the component was created
    this.dessertService.getDesserts().subscribe({
      next: data => {
        this.desserts = data;
      },
      error: error => {
        this._snackBar.open('Failed to Fetch Desserts Due to Server Error !! Please Try Again Later', 'Failure', {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-accent']
        });
      }
    })
 }

 constructor(private dessertService: DessertService, private _snackBar: MatSnackBar) {}

 onfilter($event: string) {
  this.filterCat = $event;
  this.dessertService.getDesserts().subscribe({
    next: data => {
      this.desserts = data.filter(dessert => dessert.category === this.filterCat);  //filter desserts based on category selected
      if(this.filterCat === "All")  //if the selected category is "All" get all the desserts
        this.desserts = data;
    },
    error: error => {
      this._snackBar.open('Failed to Fetch Desserts Due to Server Error !! Please Try Again Later', 'Failure', {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-accent']
      });
    }
  })

 }

 onSearch(searchtext:string) {
  this.dessertService.getDesserts().subscribe({
    next: data => {
      this.desserts = data.filter(dessert => dessert.category === this.filterCat);  //filter desserts based on category selected
      if(this.filterCat === "All")  //if the selected category is "All" get all the desserts
        this.desserts = data;

      if(searchtext === "" || !searchtext)  //if the search value is empty get all the desserts based on filtered data
        this.desserts = this.desserts;  
      else    //get all the desserts which contains search text based on filtered data
        this.desserts = this.desserts.filter(dessert => dessert.name?.toLocaleLowerCase().includes(searchtext.toLocaleLowerCase()));
    },
    error: error => {
      this._snackBar.open('Failed to Fetch Desserts Due to Server Error !! Please Try Again Later', 'Failure', {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-accent']
      });
    }
  });
 }

}
