import { Component } from '@angular/core';
import { UserService } from '../../../Services/user.service'; // Import the UsersService class
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../Models/User';
import { Search } from '../../../../Common/Model/Search';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../../../Common/Model/Pagination';
import { PageTobBarComponent } from '../../../../Common/Components/page-tob-bar/page-tob-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [MatTableModule, MatPaginator, PageTobBarComponent,
    MatIconModule, MatButtonModule, MatMenuModule, RouterLink,
    MatFormFieldModule, MatInputModule,CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  users: User[] = [];
  search: Search = {
    sortcolumn: "id",
    order: "asc",
    page: 1,
    pageSize: 0,
    value: "",
    filtercolumn: "email"
  }
  paginator: Pagination = {
    page: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0
  }
  private searchText$ = new Subject<string>();

  onSearch(searchvalue: string) {
    this.searchText$.next(searchvalue);
  }

  displayedColumns: string[] = ['avatar', 'name', 'company', 'email', 'phone', 'action'];

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.getUsers();
    this.searchText$.pipe(
      debounceTime(500),//Wait 500ms after the last user event before emitting
      distinctUntilChanged(),//Wait until the search text changes
    ).subscribe(searchvalue => {
      this.search.value = searchvalue;
      this.search.filtercolumn = "email&name";
      this.getUsers();
    });
  }

  private getUsers() {
    this.search.pageSize = this.paginator.pageSize;
    this.search.page = this.paginator.page;
    this.userService.getUsers(this.search).subscribe(response => {
      this.users = response.data ?? [];
      this.paginator.totalItems = response.pagination?.totalItems ?? 0;
    });
  }

  handlePageEvent(event: PageEvent) {
    this.paginator.page = event.pageIndex + 1;
    this.paginator.pageSize = event.pageSize;
    this.getUsers();
  }



  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
