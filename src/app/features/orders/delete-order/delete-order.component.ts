import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {OrderDTO} from '../../../dto/OrderDTO';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DeleteOrderComponent implements OnInit {

  order: OrderDTO;

  constructor(public dialog: MatDialogRef<DeleteOrderComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.order = data.order;
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialog.close();
  }
}
