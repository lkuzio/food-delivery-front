import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {AlertService} from "../../commons/alert/alert.service";
import {Observable} from "rxjs/Observable";
import {OrderDTO} from "../../dto/OrderDTO";
import {GenericResponse} from "../../dto/GenericResponse";
import {OrderLine} from "../../dto/OrderLine";
import {DataSource} from "@angular/cdk/collections";

@Injectable()
export class OrderService {

  private _selectedOrder: OrderDTO;

  orderListDataSource: OrderListDataSource;

  constructor(private http: HttpClient,
              private alertService: AlertService) {

  }

  private URL = "orders";

  getOrders(beginOfDate: string): Observable<GenericResponse<OrderDTO>> {
    var url = this.URL;
    if (beginOfDate != null) {
      url += "?endDate=" + beginOfDate;
    }
    return this.http.get(url)
      .pipe(
        catchError(err => {
            return Observable.throw(err)
          }
        ));
  }

  getOrderById(offerId: string): Observable<OrderDTO> {
    var url = this.URL + "/" + offerId;
    return this.http.get(url).pipe(
      catchError(err => {
          return Observable.throw(err)
        }
      ));
  }

  createOrder(orderDTO: OrderDTO) {
    return this.http.post(this.URL, orderDTO)
      .pipe(
        catchError(err => {
            return Observable.throw(err)
          }
        ));
  }

  createOrderItem(orderLine: OrderLine) {
    var url = this.URL + "/" + orderLine.order.id + "/lineItem"
    return this.http.post(url, orderLine)
      .pipe(
        catchError(err => {
            return Observable.throw(err)
          }
        ));
  }

  setSelectedOrder(element: OrderDTO) {
    this._selectedOrder = element;
    this.orderListDataSource = new OrderListDataSource(this.selectedOrder.orderLineNumberList);
  }


  get selectedOrder(): OrderDTO {
    return this._selectedOrder;
  }

  get OrderDetailsDataSource() {
    if (this.selectedOrder != null) {
      this.orderListDataSource = new OrderListDataSource(this.selectedOrder.orderLineNumberList);
    }
    return this.orderListDataSource;
  }


  getOrder(offerId: string): OrderDTO {
    var order;
    this.getOrderById(offerId).subscribe(
      response => {
        order = response
      },
      error2 => {
        order = null;
      }
    );
    return order;
  }

  delete(item: OrderLine) {

    this.http.delete(this.URL + '/' + item.order.id + '/lineItem/' + item.id).subscribe(() => {
      },
      err => {
      });
  }
}

export class OrderListDataSource extends DataSource<any> {
  private orders: OrderLine[];

  public setOrders(orders: OrderLine[]) {
    this.orders = orders;
  }

  constructor(orders: OrderLine[]) {
    super();
    this.orders = orders;
  }

  connect(): Observable<OrderLine[]> {
    return Observable.of(this.orders);
  }

  disconnect() {
  }
}
