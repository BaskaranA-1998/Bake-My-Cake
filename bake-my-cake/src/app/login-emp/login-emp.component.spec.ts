import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEmpComponent } from './login-emp.component';

describe('LoginEmpComponent', () => {
  let component: LoginEmpComponent;
  let fixture: ComponentFixture<LoginEmpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginEmpComponent]
    });
    fixture = TestBed.createComponent(LoginEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
