import {Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {OrderDTO} from "../../../dto/OrderDTO";
import * as moment from 'moment';
import {OrderListDataSource, OrderService} from "../OrderService";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderLine} from "../../../dto/OrderLine";
import {AuthService} from "../../../commons/AuthService";
import {DeleteOrderItemComponent} from "../delete-order-item/delete-order-item.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderDetailsComponent implements OnInit, OnChanges {

  order: OrderDTO;
  displayedColumns = ['dishName', 'price', 'purchaser', 'delete'];
  dataSource: OrderListDataSource;
  orderUrl: string;
  totalValue: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private authService: AuthService,
              public dialog: MatDialog) {
    setInterval(() => {
      this.dataSource = this.orderService.OrderDetailsDataSource;
      this.calculateTotal();

    }, 1000);
  }

  private calculateTotal() {
    this.totalValue=0;
    this.order.orderLineNumberList.forEach(value => this.totalValue += value.price);
  }

  ngOnInit() {
    var offerId;
    this.orderUrl = this.router.url;
    this.route.paramMap.subscribe(param => {
      offerId = param.get('id')
    });
    if (offerId != null) {
      this.orderService.getOrderById(offerId).subscribe(response => {
        this.order = response;
        this.orderService.setSelectedOrder(this.order);
        this.dataSource = this.orderService.OrderDetailsDataSource;
        this.calculateTotal();
      });
    }

  }


  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = this.orderService.OrderDetailsDataSource;
  }

  isActive(order: OrderDTO): boolean {
    return moment(order.endDatetime).isAfter(new Date());
  }

  delete(item: OrderLine) {
    item.order = this.order;
    let dialogRef = this.dialog.open(DeleteOrderItemComponent, {
      width: '450px',
      data: {lineItem: item}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.orderService.delete(result);
        this.order.orderLineNumberList = this.order.orderLineNumberList.filter(x => x !== result);
      }
    });
  }

  canDelete(element: OrderLine): boolean {
    return element.purchaser.id === this.authService.getUser().id || this.order.author.id === this.authService.getUser().id;
  }

  shouldBeVisible() {
    return this.order.orderLineNumberList.length > 0
  }
}


