import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {OrderLine} from '../../../dto/OrderLine';

@Component({
  selector: 'app-order-the-same-item',
  templateUrl: './order-the-same-item.component.html',
  styleUrls: ['./order-the-same-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderTheSameItemComponent implements OnInit {
  lineItem: OrderLine;

  constructor(public dialog: MatDialogRef<OrderTheSameItemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.lineItem = data.lineItem;
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialog.close();
  }
}
