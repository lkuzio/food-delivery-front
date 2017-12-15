import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTableModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {RegistrationComponent} from './features/registration/registration.component';
import {LoginComponent} from './features/login/login.component';
import {AlertComponent} from './commons/alert/alert.component';

import {AlertService} from './commons/alert/alert.service';
import {RegistrationService} from './features/registration/RegistrationService';
import {LoginService} from './features/login/LoginService';
import {AuthService} from './commons/AuthService';
import {OrdersComponent} from './features/orders/orders.component';
import {HomeComponent} from './features/home/home.component';
import {OrderService} from './features/orders/OrderService';
import {TokenInterceptor} from './commons/TokenInterceptor';
import {CreateOrderComponent} from './features/orders/create-order/create-order.component';
import {ErrorInterceptor} from './commons/ErrorInterceptor';
import {MomentModule} from 'angular2-moment';
import {CreateOrderItemComponent} from './features/orders/create-order-item/create-order-item.component';
import {OrdersRoutingModule} from './features/orders/orders-routing.module';
import {DeleteOrderItemComponent} from './features/orders/delete-order-item/delete-order-item.component';
import {OrdersModule} from './features/orders/orders.module';
import {EditOrderItemComponent} from './features/orders/edit-order-item/edit-order-item.component';
import {EditOrderComponent} from './features/orders/edit-order/edit-order.component';
import {EditProfileComponent} from './features/profile/edit-profile/edit-profile.component';
import {ProfileService} from './features/profile/ProfileService';
import {OrderTheSameItemComponent} from './features/orders/order-the-same-item/order-the-same-item.component';
import {DeleteOrderComponent} from './features/orders/delete-order/delete-order.component';
import {ProfileRoutingModule} from './features/profile/profile-routing.module';
import {OrderSummaryComponent} from './features/orders/order-summary/order-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    AlertComponent,
    HomeComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatIconModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MomentModule,
    OrdersModule,

    OrdersRoutingModule,
    ProfileRoutingModule,
    RouterModule.forRoot([
      {
        path: '',
        component: OrdersComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'login/:returnUrl',
        component: LoginComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: '**',
        component: OrdersComponent
      }
    ])
  ],
  providers: [AlertService, RegistrationService, LoginService, AuthService, OrderService, ProfileService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }],
  entryComponents: [CreateOrderComponent, CreateOrderItemComponent, DeleteOrderItemComponent, EditOrderItemComponent, EditOrderComponent,
    OrderTheSameItemComponent, DeleteOrderItemComponent, DeleteOrderComponent, OrderSummaryComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
