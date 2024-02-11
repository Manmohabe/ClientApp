import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../Services/auth.service';
import { NotificationService } from '../../../Common/Services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  year= new Date().getFullYear();
  form= new FormGroup({
    userName:new FormControl('admin',[Validators.required]),
    password:new FormControl('admin',[Validators.required])
  });

  constructor(private authservice:AuthService,
    private notification:NotificationService,
    private router:Router) { }

  login(){
    const formValue = this.form.value;
    if(this.authservice.login(formValue.userName??'',formValue.password??'')){
      this.router.navigate(['/usermodule/users']);
    }else{
      this.notification.Success('Invalid username or password');
    }
  }
}
