import { Component, Input } from '@angular/core';
import { PageTobBarComponent } from '../../../../Common/Components/page-tob-bar/page-tob-bar.component';
import { UserService } from '../../../Services/user.service';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../Models/User';
import { NotificationService } from '../../../../Common/Services/notification.service';

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [PageTobBarComponent,FlexLayoutModule,CommonModule,
    ReactiveFormsModule, MatIconModule,RouterLink, MatButtonModule,
  MatFormFieldModule,MatInputModule,MatCardModule,MatSelectModule],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.css'
})
export class CreateEditUserComponent {

 returnrul:string = '/usermodule/users'; //this is incase of create user
IsCreate=true;
   //since we are registering angular router with withComponentInputBinding()
  //The binding will be done automatically
  @Input() set id(userid: number|undefined) {

    //If the user id is not undefined, then we are editing an existing user
    //Potential bug here: incase the binding is not done properly, the user id will be undefined
    //therefore we are creating a new user instead of editing an existing one
    //We can explicitly check the route to see if we are editing or creating a new user to avoid this.
    if (userid) {
      this.returnrul = '/usermodule/users/view/' + userid;
      this.IsCreate=false;
      this.userservice.getUser(userid).subscribe(user =>{
        if(user.data){
          this.form.patchValue(user.data);
        }
        //ToDo:: handle cases where the use is null
        //Redirect to users with an error message displaying the user does not exist
      });
    }
  }

  form= new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    company: new FormControl(''),
    nextofkin: new FormControl(''),
    avatar: new FormControl(''),
    gender: new FormControl('',[Validators.required]),
    address: new FormGroup({
      street: new FormControl(''),
      building: new FormControl(''),
      town: new FormControl(''),
      postalCode: new FormControl(''),
      county: new FormControl(''),
    })
  });

  constructor(private userservice:UserService, private router:Router,
    private notification:NotificationService) { }


  onSubmit(){
    const user = this.form.value as User;
    if(this.IsCreate){
      this.userservice.createUser(user).subscribe(response=>{
        
        if (response.isSuccess) {
          this.form.reset();
          this.notification.Success(response.message??'User created successfully');
        }else{
          this.notification.Error(response.message??'Failed to create user');
        }
      });
  }
  else{
    this.userservice.updateUser(user).subscribe(response=>{
      if (response.isSuccess) {
        this.notification.Success(response.message??'User updated successfully');
        this.router.navigate([this.returnrul]);
      }else{
        this.notification.Error(response.message??'Failed to update user');
      }
    });
  }
}
}
