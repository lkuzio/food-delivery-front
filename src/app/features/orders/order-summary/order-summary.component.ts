import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderSummaryComponent implements OnInit {
  orderSummaryDataSource;
  displayedColumns = ['orderLineName', 'itemsNumber', 'priceSum'];

  constructor(public dialog: MatDialogRef<OrderSummaryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.orderSummaryDataSource = new MatTableDataSource(data.orderSummary);
  }

  ngOnInit() {
  }

  onCloseClick(): void {
    this.dialog.close();
  }
}
