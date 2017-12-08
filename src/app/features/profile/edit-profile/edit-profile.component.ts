import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserDTO} from '../../../dto/UserDTO';
import {ProfileService} from '../ProfileService';
import {AlertService} from '../../../commons/alert/alert.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditProfileComponent implements OnInit {
  user: UserDTO;
  oldUser: UserDTO;

  constructor(private profileService: ProfileService, private alertService: AlertService) {
    this.user = new UserDTO();
    this.oldUser = new UserDTO();
  }

  ngOnInit() {
    this.profileService.getProfile().subscribe(response => {
      this.user = response;
      this.oldUser = Object.assign({},  response);
    });
  }

  onSubmit() {
    if (this.user.name === this.oldUser.name && this.user.email === this.oldUser.email) {
      this.alertService.info('Profile data are the same!');
    } else {
      this.profileService.updateProfile(this.user).subscribe(response => {
        this.alertService.success('Profile data updated successfully :)');
        localStorage.setItem('user_name', this.user.name);
        this.oldUser =  Object.assign({}, response);
      }, error2 => {
        this.alertService.error('Something went wrong. Please contact with administrator system.');
      });
    }
  }
}
