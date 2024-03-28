import { Component } from '@angular/core';
import { Order } from '../models/order';
import { DessertService } from '../services/dessert.service';
import { Dessert } from '../models/dessert';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent {

  //define the dessert as empty object of type Dessert
  dessert: Dessert = {};

  //define the order as empty object of type Order
  order: Order = {};

  //initialize the order status as false
  orderStatus: boolean = false;

  minDate: Date = new Date();

  //defining the formgroup with validations
  orderForm = this.fb.group({
    customerName: ['',[Validators.required, Validators.minLength(3)]],
    customerEmail: ['',[Validators.required, Validators.pattern(/^[a-zA-Z]+[a-zA-Z0-9._%+-]*@[a-zA-Z]+[a-zA-Z0-9._%+-]*\.[a-zA-Z]{2,4}$/)]],
    customerPhone: ['',[Validators.required, Validators.pattern(/^[789]\d{9}$/)]],
    orderDate: ['',[Validators.required]],
    dessertName: [this.dessert.name],
    quantity: [1,[Validators.required, Validators.min(1)]],
    totalPrice: [0],
    customerAddress: this.fb.group({
      doorNo: ['',[Validators.required]],
      street: ['',[Validators.required, Validators.minLength(3)]],
      city: ['',[Validators.required, Validators.minLength(3)]],
      pinCode: ['',[Validators.required, Validators.pattern(/^\d{6}$/)]]
    })
  });
    
  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private dessertService: DessertService, 
    private routeService: RouterService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get("id") ?? 0; //get the id of the selected dessert

      this.dessertService.getDessert(+id).subscribe(data => {
        this.dessert = data;  //get the dessert data based on selected id
        this.dessertName?.setValue(this.dessert.name);
        this.totalPrice?.setValue(this.dessert.price || 0);
      });
    });
  }

  //declare accessor methods
  get customerName() {return this.orderForm.get('customerName');}
  get customerEmail() {return this.orderForm.get('customerEmail');}
  get customerPhone() {return this.orderForm.get('customerPhone');}
  get orderDate() {return this.orderForm.get('orderDate');}
  get dessertName() {return this.orderForm.get('dessertName');}
  get quantity() {return this.orderForm.get('quantity');}
  get totalPrice() {return this.orderForm.get('totalPrice');}
  get customerAddress() {return this.orderForm.get('customerAddress');}
  get doorNo() {return this.customerAddress?.get('doorNo');}
  get street() {return this.customerAddress?.get('street');}
  get city() {return this.customerAddress?.get('city');}
  get pinCode() {return this.customerAddress?.get('pinCode');}


  //function called when the user clicks the order button
  placeOrder() {
    let formData: Order = this.orderForm.value as Order;
    formData.customerName = (this.customerName?.value || "Error").toLowerCase();
    formData.customerEmail = (this.customerEmail?.value || "Error").toLowerCase();
    formData.orderDate = this.formatedDate();   //call the method to change the date format; pass date object as parameter

    formData.dessert = this.dessert;

    //call the postOrder method in the service to post the order data to the server
    this.dessertService.postOrder(formData).subscribe({ 
      next: data => {
        this._snackBar.open('You are successfully Ordered !!', 'Success', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
        this.orderStatus = true;  //change the value of order status to true after the successful submition
        this.routeService.navigateToOrderDetailsView(data.id || 0);  //navigate to order-details view
      },
      error: error => {
        this._snackBar.open('Failed to place the Order !! Please Try Again Later', 'Failure', {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }
    });
  }

  //method the change the date format as "DD-MM-YYYY" 
  formatedDate() {
    const orderDateControl = this.orderForm.get("orderDate");
    
    if (orderDateControl && orderDateControl.value) {
        const dateObject = new Date(orderDateControl.value);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); //return value of the month starts from 0, so add 1 to get the current month
        const date = (dateObject.getDate()).toString().padStart(2, '0');
        return `${date}-${month}-${year}`;
    }
    return 'Error'; 
  }

  //method to calculate the total price by multipling the quantity and dessert price
  calculateTotalPrice() {
    let quantity = this.orderForm.get("quantity")?.value || 0;
    this.order.totalPrice = parseFloat((quantity * (this.dessert.price || 0)).toFixed(2));

    this.totalPrice?.setValue(this.order.totalPrice);
  }

  //method to inform the user about unsaved changes when the user try to naviage to other views
  canDeactivate() {
    if(!this.orderStatus)
      this.orderStatus = confirm(`Your order is not yet saved! click "OK" if you want to cancel the order and return to home view.`);
    return this.orderStatus;
  }

}
