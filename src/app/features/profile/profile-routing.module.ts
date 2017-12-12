import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {AuthService} from '../../commons/AuthService';

const profileRoutes: Routes = [
  {
    path: 'profile/edit',
    component: EditProfileComponent,
    canActivate: [AuthService]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(profileRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProfileRoutingModule {
}
