
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {OrdersRoutingModule} from "./orders-routing.module";
import {OrdersComponent} from "./orders.component";
import {OrderDetailsComponent} from "./order-details/order-details.component";
import {CreateOrderComponent} from "./create-order/create-order.component";
import {CreateOrderItemComponent} from "./create-order-item/create-order-item.component";
import {OrderService} from "./OrderService";
import {DeleteOrderItemComponent} from "./delete-order-item/delete-order-item.component";

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
    CreateOrderItemComponent,
    DeleteOrderItemComponent
  ],
  providers:[
    OrderService
  ]
})

export class OrdersModule{}
