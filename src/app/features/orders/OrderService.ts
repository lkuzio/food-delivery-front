import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {AlertService} from '../../commons/alert/alert.service';
import {Observable} from 'rxjs/Observable';
import {OrderDTO} from '../../dto/OrderDTO';
import {GenericResponse} from '../../dto/GenericResponse';
import {OrderLine} from '../../dto/OrderLine';
import {DataSource} from '@angular/cdk/collections';
import {ValidationError} from '../../dto/ValidationError';
import {UpdateOrderLine} from '../../dto/UpdateOrderLine';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class OrderService {

  private _selectedOrder: OrderDTO;

  orderListDataSource: OrderListDataSource;

  constructor(private http: HttpClient,
              private alertService: AlertService) {
  }

  private URL = 'orders';
  private _total = 0;

  getOrders(beginOfDate: string): Observable<GenericResponse<OrderDTO>> {
    let url = this.URL;
    if (beginOfDate != null) {
      url += '?endDate=' + beginOfDate;
    }
    return this.http.get(url)
      .pipe(
        catchError(err => {
            return Observable.throw(err);
          }
        ));
  }

  getOrderById(offerId: string): Observable<OrderDTO> {
    let url = this.URL + '/' + offerId;
    return this.http.get(url).pipe(
      catchError(err => {
          return Observable.throw(err);
        }
      ));
  }

  createOrder(orderDTO: OrderDTO) {
    return this.http.post(this.URL, orderDTO)
      .pipe(
        catchError(err => {
            return Observable.throw(err);
          }
        ));
  }

  createOrderItem(orderLine: OrderLine) {
    let url = this.URL + '/' + orderLine.order.id + '/lineItem';
    return this.http.post(url, orderLine)
      .pipe(
        catchError(err => {
            let error: ValidationError = err.error;
            let validationMessage = '';
            error.fieldErrors.forEach(x => validationMessage += x.message);
            this.alertService.error(validationMessage);
            return Observable.empty();
          }
        ));
  }

  delete(item: OrderLine) {
    this.http.delete(this.URL + '/' + item.order.id + '/lineItem/' + item.id).subscribe(() => {
      },
      err => {
      });
  }

  updateOrderLine(item: UpdateOrderLine): Observable<OrderLine> {
    const url = this.URL + '/' + item.order + '/lineItem/' + item.id;
    return this.http.patch<OrderLine>(url, item, httpOptions)
      .pipe(
        catchError(err => {
          console.log(err);
          return Observable.throw(err);
        })
      );
  }

  setSelectedOrder(element: OrderDTO) {
    this._selectedOrder = element;
    this.orderListDataSource = new OrderListDataSource(this.selectedOrder.orderLineNumberList);
  }


  get selectedOrder(): OrderDTO {
    return this._selectedOrder;
  }

  get OrderDetailsDataSource() {
    this.orderListDataSource = new OrderListDataSource(this.selectedOrder.orderLineNumberList);
    return this.orderListDataSource;
  }


  getOrder(offerId: string): OrderDTO {
    let order;
    this.getOrderById(offerId).subscribe(
      response => {
        order = response;
      },
      error2 => {
        order = null;
      }
    );
    return order;
  }

  editOrder(editedOrder: OrderDTO) {
    return this.http.put(this.URL + '/' + editedOrder.id, editedOrder)
      .pipe(
        catchError(err => {
            return Observable.throw(err);
          }
        ));
  }

  get total(): number {
    return this._total;
  }

  set total(value: number) {
    this._total = value;
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
