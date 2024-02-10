import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { Search } from '../../Common/Model/Search';
import { ApiResponse } from '../../Common/Model/ApiResponse';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];

  constructor() {
    this.initUsers();
   }


  getUsers(search: Search): Observable<ApiResponse<User[]>> {
    const value = search.value.toLowerCase();
    const filteredUsers = this.users.filter(user => {
      switch (search.filtercolumn) { // Filter users based on the specified column
        case 'name':
          return user.name.toLowerCase().includes(value);
        case 'email':
          return user.email.toLowerCase().includes(value);
        case 'phone':
          return user.phone.includes(value);
        case 'company':
          return user.company?.toLowerCase().includes(value);
        case 'county':
          return user.address.county.toLowerCase().includes(value);
      }
      return true; // Return true if no filter column is specified
    });

    const totalItems = filteredUsers.length;
    const totalPages = Math.ceil(totalItems / search.pageSize);
    const startIndex = (search.page - 1) * search.pageSize;
    const endIndex = startIndex + search.pageSize;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    const response: ApiResponse<User[]> = {
      data: paginatedUsers,
      isSuccess: true,
      message: 'Users retrieved successfully',
      errors: null,
      pagination: {
        page: search.page,
        pageSize: search.pageSize,
        totalItems: totalItems,
        totalPages: totalPages
      }
    };
    return of(response);
  }

  getUser(id: number): Observable<ApiResponse<User>> {
    const user = this.users.find(user => user.id === id);

    const response: ApiResponse<User> = {
      data: user,
      isSuccess: true,
      message: null,
      errors: null,
      pagination: null
    };
    return of(response);
  }

  createUser(user: User): Observable<ApiResponse<User>> {
    const lastId = this.users.length > 0 ? this.users[this.users.length - 1].id : 0;
    const newUser: User = { ...user, id: lastId + 1 };
    this.users.push(newUser);
    const response: ApiResponse<User> = {
      data: user,
      isSuccess: true,
      message: "User created successfully",
      errors: null,
      pagination: null
    };
    return of(response);
  }

  updateUser(user: User): Observable<ApiResponse<User>> {
    let index = this.users.findIndex(u => u.id === user.id);
    this.users[index] = user;
    const response: ApiResponse<User> = {
      data: user,
      isSuccess: true,
      message: "User Updated successfully",
      errors: null,
      pagination: null
    };
    return of(response);
  }

  deleteUser(id: number): Observable<void> {
    let index = this.users.findIndex(user => user.id === id);
    this.users.splice(index, 1);
    return of();
  }

  initUsers(): void {
    const numberOfUsers = 50; // Specify the number of random users to generate

    for (let i = 1; i <= numberOfUsers; i++) {
      const user: User = {
        id: i,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        phone: `07113810${i}`.padEnd(10, '0'), // Ensure phone number is 10 characters long
        avatar: `https://i.pravatar.cc/150?img=${i}`,
        company: i % 2 === 0 ? undefined : `Company ${i}`,// Randomly set company to undefined
        address: {
          street: `Street ${i}`,
          building: `Building ${i}`,
          town: `Town ${i}`,
          postalCode: `P0ST4L C0D3 ${i}`,
          county: `County ${i}`,
        },
      };

      this.users.push(user);
    }
  }
}
