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
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTableModule
} from "@angular/material";
import {MomentModule} from "angular2-moment";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    MomentModule,
    OrdersRoutingModule
  ],
  declarations: [
    OrdersComponent,
    OrderDetailsComponent,
    CreateOrderComponent,
    CreateOrderItemComponent,
    DeleteOrderItemComponent
  ],
  providers: [
    OrderService
  ]
})

export class OrdersModule {
}
