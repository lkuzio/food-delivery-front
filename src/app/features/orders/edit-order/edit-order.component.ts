import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {OrderDTO} from "../../../dto/OrderDTO";
import {OrderService} from "../OrderService";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import * as moment from 'moment';

@Component({
  selector: 'app-create-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditOrderComponent implements OnInit {

  endDatetime: string;

  editedOrder: OrderDTO;

  constructor(private orderService: OrderService,
              private router: Router,
              public dialog: MatDialogRef<EditOrderComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.editedOrder = data.order;
    this.endDatetime = moment(Date.parse(this.editedOrder.endDatetime)).format("HH:mm");

  }

  ngOnInit() {
  }


  onEditOrder() {
    this.editedOrder.endDatetime = this.calculateEndDateTime();
    this.orderService.editOrder(this.editedOrder).subscribe(() => {
      this.dialog.close();
      this.router.navigateByUrl('orders')
    });
  }

  private calculateEndDateTime() {
    var splited;
    splited = this.endDatetime.split(":");
    return moment(new Date()).set("hours", splited[0]).set("minutes", splited[1]).format("YYYY-MM-DDTHH:mm").toString();

  }
}
