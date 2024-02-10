import { Component } from '@angular/core';
import { UserService } from '../../../Services/user.service'; // Import the UsersService class
import { Router } from '@angular/router';
import { User } from '../../../Models/User';
import { Search } from '../../../../Common/Model/Search';
import {MatTableModule} from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../../../Common/Model/Pagination';
import { PageTobBarComponent } from '../../../../Common/Components/page-tob-bar/page-tob-bar.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [MatTableModule, MatPaginator,PageTobBarComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  users:User[]=[];
  search:Search={
    sortcolumn:"id",
    order:"asc",
    page:1,
    pageSize:0,
    value:"",
    filtercolumn:"email"
  }
paginator:Pagination={
  page:1,
  pageSize:10,
  totalItems:0,
  totalPages:0
}

  displayedColumns: string[] = ['avatar','name','company', 'email', 'phone', 'action'];

  constructor(private userService: UserService, private router: Router) { 
  }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.search.pageSize=this.paginator.pageSize;
    this.search.page=this.paginator.page;
    this.userService.getUsers(this.search).subscribe(response => {
      this.users = response.data??[];
      this.paginator.totalItems=response.pagination?.totalItems??0;
    });
  }

  handlePageEvent(event: PageEvent) {
    this.paginator.page = event.pageIndex + 1;
    this.paginator.pageSize = event.pageSize;
    this.getUsers();
  }
}
