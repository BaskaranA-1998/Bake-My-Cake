import { Component, Input } from '@angular/core';
import { Dessert } from '../models/dessert';

@Component({
  selector: 'app-dessert-card',
  templateUrl: './dessert-card.component.html',
  styleUrls: ['./dessert-card.component.css']
})
export class DessertCardComponent {

  //get the dessert data from dashboard component
  @Input()
  dessert?: Dessert;

  constructor() {}
}
