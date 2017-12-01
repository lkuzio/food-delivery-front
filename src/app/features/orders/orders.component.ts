import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "./OrderService";
import {AlertService} from "../../commons/alert/alert.service";
import {OrderDTO} from "../../dto/OrderDTO";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {DataSource} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material";
import {CreateOrderComponent} from "./create-order/create-order.component";
import * as moment from 'moment';
import {EditOrderComponent} from "./edit-order/edit-order.component";
import {AuthService} from "../../commons/AuthService";


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrdersComponent implements OnInit {

  errorMessage: String;
  orders: OrderDTO[];
  dataSource;
  displayedColumns = ['restaurantName', 'endDatetime', 'author', 'details'];
  selectedOrder: OrderDTO;

  constructor(private router: Router,
              private orderService: OrderService,
              private alertService: AlertService,
              public dialog: MatDialog,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.orders = new Array();
    this.getOrders();
  }

  getOrders() {
    var beginOfDate = moment(new Date()).set("hours", 0).set("minutes", 0).format("YYYY-MM-DDTHH:mm")
    this.orderService.getOrders(beginOfDate)
      .subscribe(
        response => {
          this.orders = response.content
          this.dataSource = new OrderListDataSource(this.orders);
        },
        error => this.errorMessage = <any>error
      );
  }

  openDialogCreateOrder(): void {
    let refdialog = this.dialog.open(CreateOrderComponent);

    refdialog.afterClosed().subscribe(
      () => {
        this.getOrders()
      }
    );
  }

  onSelect(element: OrderDTO) {
    this.selectedOrder = element;
    this.orderService.setSelectedOrder(element);
  }

  editOrder(element: OrderDTO) {
    let refdialog = this.dialog.open(EditOrderComponent, {
      width: '450px',
      data: {order: element}
    });

    refdialog.afterClosed().subscribe(
      () => {
        this.getOrders()
      }
    );
  }

  canEditOrderDef(element: OrderDTO): boolean {
    return element.author.id === this.authService.getUser().id
  }
}


export class OrderListDataSource extends DataSource<any> {
  private orders: OrderDTO[];

  constructor(orders: OrderDTO[]) {
    super();
    this.orders = orders;
  }

  connect(): Observable<OrderDTO[]> {
    return Observable.of(this.orders);
  }

  disconnect() {
  }
}
