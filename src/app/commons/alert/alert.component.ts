import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AlertService} from "./alert.service";
import {MatSnackBar, MatSnackBarModule} from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AlertComponent implements OnInit {

  message: any;

  constructor(private alertService: AlertService, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.alertService.getMessage()
      .subscribe(message => {
        this.message = message;

      });
  }


}
