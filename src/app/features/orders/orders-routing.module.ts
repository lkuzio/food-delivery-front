import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from './orders.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {AuthService} from '../../commons/AuthService';

const orderRoutes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthService]
  },
  {
    path: 'order/:id',
    component: OrderDetailsComponent,
    canActivate: [AuthService]
  }

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
