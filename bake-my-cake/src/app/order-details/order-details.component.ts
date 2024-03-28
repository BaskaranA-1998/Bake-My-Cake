import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DessertService } from '../services/dessert.service';
import { RouterService } from '../services/router.service';
import { Order } from '../models/order';
import { Dessert } from '../models/dessert';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order: Order = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private dessertService: DessertService, 
    private routeService: RouterService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get("id") ?? 0; //get the id of the selected dessert

      this.dessertService.getOrder(+id).subscribe(data => {
        this.order = data;  //get the order data based on selected id
      });
    });
  }

}
