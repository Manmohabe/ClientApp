import { Routes } from "@angular/router";


export const UserModuleRoutes: Routes = [
    {
        path: 'users',
        data: {
            breadcrumb: {
                label: 'Users'
            }
        },
        loadChildren: () => import('./Components/Users/Users.routes').then(m => m.UsersRoutes)
    },

];