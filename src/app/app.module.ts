import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
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

import {AlertService} from "./commons/alert/alert.service";
import {RegistrationService} from "./features/registration/RegistrationService";
import {LoginService} from "./features/login/LoginService";
import {AuthService} from "./commons/AuthService";
import {OrdersComponent} from './features/orders/orders.component';
import {HomeComponent} from './features/home/home.component';
import {OrderService} from "./features/orders/OrderService";
import {TokenInterceptor} from "./commons/TokenInterceptor";
import {CreateOrderComponent} from './features/orders/create-order/create-order.component';
import {ErrorInterceptor} from "./commons/ErrorInterceptor";
import {MomentModule} from 'angular2-moment';
import {CreateOrderItemComponent} from './features/orders/create-order-item/create-order-item.component';
import {OrdersRoutingModule} from "./features/orders/orders-routing.module";
import {DeleteOrderItemComponent} from "./features/orders/delete-order-item/delete-order-item.component";
import {OrdersModule} from "./features/orders/orders.module";

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    AlertComponent,
    HomeComponent
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
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MomentModule,
    OrdersRoutingModule,
    OrdersModule,
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
        path: 'registration',
        component: RegistrationComponent
      }
    ])
  ],
  providers: [AlertService, RegistrationService, LoginService, AuthService, OrderService,
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
  entryComponents: [CreateOrderComponent, CreateOrderItemComponent, DeleteOrderItemComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
