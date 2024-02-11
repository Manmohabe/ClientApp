import { Component, Input } from '@angular/core';
import { PageTobBarComponent } from '../../../../Common/Components/page-tob-bar/page-tob-bar.component';
import { UserService } from '../../../Services/user.service';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [PageTobBarComponent,FlexLayoutModule,CommonModule,
    ReactiveFormsModule],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.css'
})
export class CreateEditUserComponent {

   //since we are registering angular router with withComponentInputBinding()
  //The binding will be done automatically
  @Input() set id(userid: number|undefined) {

    //If the user id is not undefined, then we are editing an existing user
    //Potential bug here: incase the binding is not done properly, the user id will be undefined
    //therefore we are creating a new user instead of editing an existing one
    //We can explicitly check the route to see if we are editing or creating a new user to avoid this.
    if (userid) {
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
    address: new FormGroup({
      street: new FormControl(''),
      building: new FormControl(''),
      town: new FormControl(''),
      postalCode: new FormControl(''),
      county: new FormControl(''),
    })
  });

  constructor(private userservice:UserService) { }


}
