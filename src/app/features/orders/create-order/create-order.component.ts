import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {OrderDTO} from "../../../dto/OrderDTO";
import {OrderService} from "../OrderService";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material";
import * as moment from 'moment';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateOrderComponent implements OnInit {

  endDatetime: string;

  createOrder = new OrderDTO();

  constructor(private orderService: OrderService, private router: Router, public dialog: MatDialog) {
    this.endDatetime = moment(new Date()).add(1,"hours").format("HH:mm");
  }

  ngOnInit() {
  }


  onCreateOrder() {
    this.createOrder.endDatetime = this.calculateEndDateTime();
    this.orderService.createOrder(this.createOrder).subscribe(() => {
      this.dialog.closeAll();
      this.router.navigateByUrl('orders')
    });
  }

  private calculateEndDateTime() {
    var splited;
    splited = this.endDatetime.split(":");
    return moment(new Date()).set("hours", splited[0]).set("minutes", splited[1]).format("YYYY-MM-DD HH:mm").toString();

  }
}
