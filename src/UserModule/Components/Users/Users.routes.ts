import { Routes } from "@angular/router";
import { UsersListComponent } from "./users-list/users-list.component";
import { ViewUserComponent } from "./view-user/view-user.component";
import { CreateEditUserComponent } from "./create-edit-user/create-edit-user.component";

export const UsersRoutes: Routes = [
    { path: '', title: "Users List", component: UsersListComponent },
    {
        path: 'create',
        title: "Create User",
        data: {
            breadcrumb: {
                label: 'New',
            }
        },
        component: CreateEditUserComponent
    },
    {
        path: 'edit/:id',
        title: "Edit User",
        data: {
            breadcrumb: {
                label: 'Edit',
            }
        }, component: CreateEditUserComponent
    },
    {
        path: 'view/:id',
        title: "View User",
        data: {
            breadcrumb: {
                label: 'View',
            }
        }, component: ViewUserComponent
    }
];