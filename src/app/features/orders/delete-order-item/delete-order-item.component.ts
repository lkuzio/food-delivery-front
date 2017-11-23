import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {OrderLine} from "../../../dto/OrderLine";

@Component({
  selector: 'app-delete-order-item',
  templateUrl: './delete-order-item.component.html',
  styleUrls: ['./delete-order-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DeleteOrderItemComponent implements OnInit {

  lineItem: OrderLine;

  constructor(public dialog: MatDialogRef<DeleteOrderItemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.lineItem=data.lineItem;
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialog.close();
  }


}
