import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DessertCardComponent } from './dessert-card.component';

describe('DessertCardComponent', () => {
  let component: DessertCardComponent;
  let fixture: ComponentFixture<DessertCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DessertCardComponent]
    });
    fixture = TestBed.createComponent(DessertCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
