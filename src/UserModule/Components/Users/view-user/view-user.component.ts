import { Component, Input } from '@angular/core';
import { PageTobBarComponent } from '../../../../Common/Components/page-tob-bar/page-tob-bar.component';
import { UserService } from '../../../Services/user.service';
import { User } from '../../../Models/User';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [PageTobBarComponent,MatButtonModule,MatIconModule,RouterLink],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent {
  user:User|undefined;

  //since we are registering angular router with withComponentInputBinding()
  //The binding will be done automatically
  @Input() set id(userid: number) {
    this.userservice.getUser(userid).subscribe(user => this.user = user.data);
  }

  constructor(private userservice:UserService) { }
  
}
