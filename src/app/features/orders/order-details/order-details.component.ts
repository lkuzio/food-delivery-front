import {ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {OrderDTO} from "../../../dto/OrderDTO";
import * as moment from 'moment';
import {OrderListDataSource, OrderService} from "../OrderService";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderLine} from "../../../dto/OrderLine";
import {AuthService} from "../../../commons/AuthService";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderDetailsComponent implements OnInit, OnChanges {

  order: OrderDTO;
  displayedColumns = ['dishName', 'price', 'purchaser','delete'];
  dataSource: OrderListDataSource;
  orderUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private authService: AuthService) {
    setInterval(() => {
      this.dataSource = this.orderService.OrderDetailsDataSource;
    }, 1000);
  }

  ngOnInit() {
    var offerId;
    this.orderUrl=this.router.url;
    this.route.paramMap.subscribe(param => {
      offerId = param.get('id')
    });
    if (offerId != null) {
      this.orderService.getOrderById(offerId).subscribe(response => {
        this.order = response;
        this.orderService.setSelectedOrder(this.order);
        this.dataSource = this.orderService.OrderDetailsDataSource;

      });
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = this.orderService.OrderDetailsDataSource;
  }

  isActive(order: OrderDTO): boolean {
    return moment(order.endDatetime).isAfter(new Date());
  }

  delete(item:OrderLine){
    item.order=this.order;
    this.orderService.delete(item);
    this.order.orderLineNumberList=this.order.orderLineNumberList.filter(x=>x!==item);

  }

}


