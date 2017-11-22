
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {OrdersRoutingModule} from "./orders-routing.module";
import {OrdersComponent} from "./orders.component";
import {OrderDetailsComponent} from "./order-details/order-details.component";
import {CreateOrderComponent} from "./create-order/create-order.component";
import {CreateOrderItemComponent} from "./create-order-item/create-order-item.component";
import {OrderService} from "./OrderService";

@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    OrdersRoutingModule
  ],
  declarations:[
    OrdersComponent,
    OrderDetailsComponent,
    CreateOrderComponent,
    CreateOrderItemComponent
  ],
  providers:[
    OrderService
  ]
})

export class OrdersModule{}
