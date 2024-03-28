import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  //initialize the filter category as "All"
  filterCategory: string = 'All';

  @Output() 
  filteredCategory: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.filteredCategory.emit(this.filterCategory);  //emit the filtere category when the component created
  }

  filter() {
    if(!this.filterCategory)
      this.filterCategory = "All";  //assign value "All" to the filter category when no chip is selected
    
    this.filteredCategory.emit(this.filterCategory); //emit the filter category when the user selects the chip
  }
}
