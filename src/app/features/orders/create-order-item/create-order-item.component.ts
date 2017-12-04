import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {OrderLine} from "../../../dto/OrderLine";
import {OrderService} from "../OrderService";
import {OrderDTO} from "../../../dto/OrderDTO";
import {AuthService} from "../../../commons/AuthService";
import {OrderDetailsComponent} from "../order-details/order-details.component";
import {Router} from "@angular/router";


@Component({
  selector: 'app-create-order-item',
  templateUrl: './create-order-item.component.html',
  styleUrls: ['./create-order-item.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [OrderDetailsComponent]
})
export class CreateOrderItemComponent implements OnInit {

  orderLine: OrderLine;
  @Input() orderDetail: OrderDTO;

  constructor(private orderService: OrderService,
              private authService: AuthService,
              private  router: Router) {
    this.orderLine = new OrderLine();
  }

  ngOnInit() {
    this.orderLine = new OrderLine();
    this.orderLine.paid = false;
    if(this.orderDetail!=null) {
      this.orderLine.order = this.orderDetail;
    } else{
      this.orderLine.order = this.orderService.selectedOrder;
    }
  }

  onCreateOrderLine() {
    this.orderLine.purchaser = this.authService.getUser();
    this.orderService.createOrderItem(this.orderLine)
      .subscribe(
        (orderResp: OrderDTO) => {
          this.orderDetail = orderResp;
          this.orderService.setSelectedOrder(orderResp);
          this.ngOnInit();
        }
      );
  }
}
