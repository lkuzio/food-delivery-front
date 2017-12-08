import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTheSameItemComponent } from './order-the-same-item.component';

describe('OrderTheSameItemComponent', () => {
  let component: OrderTheSameItemComponent;
  let fixture: ComponentFixture<OrderTheSameItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTheSameItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTheSameItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
