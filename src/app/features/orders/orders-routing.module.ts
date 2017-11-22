import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {OrdersComponent} from "./orders.component";
import {OrderDetailsComponent} from "./order-details/order-details.component";

const orderRoutes: Routes = [
  {path: 'orders', component: OrdersComponent},
  {path: 'order/:id', component: OrderDetailsComponent}

];

@NgModule({
  imports: [
    RouterModule.forChild(orderRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrdersRoutingModule {
}
