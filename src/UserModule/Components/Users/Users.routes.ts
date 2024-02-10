import { Routes } from "@angular/router";
import { UsersListComponent } from "./users-list/users-list.component";
import { CreateUserComponent } from "./create-user/create-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { ViewUserComponent } from "./view-user/view-user.component";

export const UsersRoutes: Routes = [
    { path: '',title:"Users List", component: UsersListComponent},
    { path: 'create',title:"Create User",  data:{breakcrumb:"New"}, component: CreateUserComponent},
    { path: 'edit/:id',title:"Edit User", data:{breakcrumb:"Edit"}, component: EditUserComponent},
    { path: 'view/:id',title:"View User",  data:{breakcrumb:"View"},component: ViewUserComponent}
];