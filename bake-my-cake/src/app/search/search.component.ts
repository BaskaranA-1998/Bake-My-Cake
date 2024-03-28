import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  //initialize the searchText as an empty string
  searchText: string = "";

  //declaring the output property "searchedText" using output property decorator
  @Output() searchedText: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }
  ngOnInit(): void {
  }

  //searchDessert function to emit the searchText to dashboard component
  searchDessert(){
    this.searchedText.emit(this.searchText);
  }
  
}
