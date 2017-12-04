import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {OrderService} from "../OrderService";
import {UpdateOrderLine} from "../../../dto/UpdateOrderLine";
import {OrderLine} from "../../../dto/OrderLine";

@Component({
  selector: 'app-delete-order-item',
  templateUrl: './edit-order-item.component.html',
  styleUrls: ['./edit-order-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditOrderItemComponent implements OnInit {

  item: OrderLine;
  lineItem: UpdateOrderLine = new UpdateOrderLine();

  oldPrice: number;
  oldName: string;

  constructor(public dialog: MatDialogRef<EditOrderItemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private orderService: OrderService) {
    this.item = data.lineItem;
    this.lineItem.order = data.lineItem.order.id;
    this.lineItem.price = data.lineItem.price;
    this.lineItem.dishName = data.lineItem.dishName;
    this.lineItem.id = data.lineItem.id;
    this.oldName = this.lineItem.dishName;
    this.oldPrice = this.lineItem.price;
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.item.price = this.oldPrice;
    this.item.dishName = this.oldName;
    this.dialog.close();
  }


  onEditClick() {
    this.lineItem.price = this.item.price;
    this.lineItem.dishName = this.item.dishName;
    this.orderService.updateOrderLine(this.lineItem)
      .subscribe(
        response => {
          this.item = response;
        },
        error2 => {
          console.log(error2);
        }
      );
    this.dialog.close();
  }
}
