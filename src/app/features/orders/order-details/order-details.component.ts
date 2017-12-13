import {Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {OrderDTO} from '../../../dto/OrderDTO';
import * as moment from 'moment';
import {OrderListDataSource, OrderService} from '../OrderService';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderLine} from '../../../dto/OrderLine';
import {AuthService} from '../../../commons/AuthService';
import {DeleteOrderItemComponent} from '../delete-order-item/delete-order-item.component';
import {MatDialog} from '@angular/material';
import {EditOrderItemComponent} from '../edit-order-item/edit-order-item.component';
import {UpdateOrderLine} from '../../../dto/UpdateOrderLine';
import {OrderTheSameItemComponent} from '../order-the-same-item/order-the-same-item.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderDetailsComponent implements OnInit, OnChanges {
  orderLine: OrderLine;

  order: OrderDTO;
  displayedColumns = ['dishName', 'price', 'purchaser', 'paid', 'actions'];
  dataSource: OrderListDataSource;
  orderUrl: string;
  totalValue: number = this.orderService.total;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private authService: AuthService,
              public dialog: MatDialog) {
    if (this.orderLine !== undefined) {
      setInterval(() => {
        this.dataSource = this.orderService.OrderDetailsDataSource;
        this.calculateTotal();

      }, 1000);
    }
  }

  private calculateTotal() {
    let total = 0;
    this.order.orderLineNumberList.forEach(value => total += value.price);
    this.totalValue = total;
  }

  ngOnInit() {
    let offerId;
    this.orderUrl = this.router.url;
    this.route.paramMap.subscribe(param => {
      offerId = param.get('id');
    });
    this.orderLine = new OrderLine();
    this.orderLine.paid = false;

    if (offerId != null) {
      this.orderService.getOrderById(offerId).subscribe(response => {
        this.order = response;
        this.orderService.setSelectedOrder(this.order);
        this.dataSource = this.orderService.OrderDetailsDataSource;
        this.calculateTotal();
      });
    } else {
      this.router.navigateByUrl('/orders');
    }

  }


  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = this.orderService.OrderDetailsDataSource;
    this.calculateTotal();
  }

  isActive(order: OrderDTO): boolean {
    return moment(order.endDatetime).isAfter(new Date());
  }

  onCreateOrderLine() {
    this.orderLine.order = this.order;
    this.orderLine.purchaser = this.authService.getUser();
    this.orderService.createOrderItem(this.orderLine)
      .subscribe(
        (orderResp: OrderDTO) => {
          this.order = orderResp;
          this.orderService.setSelectedOrder(orderResp);
          this.ngOnInit();
        }
      );
  }

  delete(item: OrderLine) {
    item.order = this.order;
    const dialogRef = this.dialog.open(DeleteOrderItemComponent, {
      minWidth: '30vw',
      data: {lineItem: item}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.orderService.deleteOrderLineItem(result);
        this.order.orderLineNumberList = this.order.orderLineNumberList.filter(x => x !== result);
        this.dataSource = this.orderService.OrderDetailsDataSource;
        this.calculateTotal();
      }
    });
  }

  canDelete(element: OrderLine): boolean {
    return element.purchaser.id === this.authService.getUser().id || this.order.author.id === this.authService.getUser().id;
  }

  isOrderAuthor(order: OrderDTO): boolean {
    return order.author.id === this.authService.getUser().id;
  }

  shouldBeVisible() {
    return this.order.orderLineNumberList.length > 0;
  }

  canEdit(element: OrderLine): boolean {
    return element.purchaser.id === this.authService.getUser().id || this.order.author.id === this.authService.getUser().id;
  }

  canBeOrderedAgain(order: OrderDTO): boolean {
    return this.isActive(order) || order.author.id === this.authService.getUser().id;
  }


  edit(element: OrderLine) {
    element.order = this.order;
    const dialogRef = this.dialog.open(EditOrderItemComponent, {
      minWidth: '30vw',
      data: {lineItem: element}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.dataSource = this.orderService.OrderDetailsDataSource;
        this.calculateTotal();
      }
    });
  }

  setPaid(element: OrderLine) {
    element.paid = !element.paid;
    const update: UpdateOrderLine = new UpdateOrderLine();
    update.paid = element.paid;
    update.id = element.id;
    update.order = this.order.id;

    this.orderService.updateOrderLine(update).subscribe(
      response => {
        element = response;
      },
      error2 => {
        console.log(error2);
      }
    );
  }

  canSetPaid(element: OrderLine): boolean {
    return this.order.author.id === this.authService.getUser().id;
  }

  orderTheSame(order: OrderLine) {
    const selectedOrder = Object.assign({}, order);
    selectedOrder.order = this.order;
    selectedOrder.purchaser = this.authService.getUser();
    selectedOrder.paid = false;

    const dialogRef = this.dialog.open(OrderTheSameItemComponent, {
      minWidth: '30vw',
      data: {lineItem: selectedOrder}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.orderService.createOrderItem(result)
          .subscribe(
            (orderResp: OrderDTO) => {
              this.order = orderResp;
              this.orderService.setSelectedOrder(orderResp);
              this.ngOnInit();
            }
          );
      }
    });
  }
}
