import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {OrderLine} from "../../../dto/OrderLine";
import {OrderService} from "../OrderService";
import {OrderDTO} from "../../../dto/OrderDTO";
import {AuthService} from "../../../commons/AuthService";
import {OrderDetailsComponent} from "../order-details/order-details.component";
import {AlertService} from "../../../commons/alert/alert.service";


@Component({
  selector: 'app-create-order-item',
  templateUrl: './create-order-item.component.html',
  styleUrls: ['./create-order-item.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [OrderDetailsComponent]
})
export class CreateOrderItemComponent implements OnInit {

  orderLine: OrderLine;
  @Input() orderDetailUrl: string;
  private selectedOrder: OrderDTO;

  constructor(private orderService: OrderService,
              private authService: AuthService,
              private alertService: AlertService) {
    this.orderLine = new OrderLine();
  }

  ngOnInit() {
    this.selectedOrder = this.orderService.selectedOrder;
    this.orderLine = new OrderLine();
  }

  onCreateOrderLine() {
    this.orderLine.order = this.selectedOrder;
    this.orderLine.purchaser = this.authService.getUser();
    this.orderLine.isPaid = false;
    this.orderService.createOrderItem(this.orderLine)
      .subscribe(
        (orderResp: OrderDTO) => {
          this.selectedOrder = orderResp;
          this.orderService.setSelectedOrder(orderResp);
          this.orderLine = new OrderLine();
        }
      );

  }
}
