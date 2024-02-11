import { Routes } from '@angular/router';
import { authGuard } from '../AuthModule/Services/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        data: {
            breadcrumb: {
                label: 'Home',
                info: { myData: { icon: 'home', iconType: 'material' } }
            }
        },
        pathMatch: 'full',
    },
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('../Common/Layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
        children: [
            { path: 'home', title: 'Home', loadComponent: () => import('../Common/Dashboards/home/home.component').then(m => m.HomeComponent) },
            {
                path: 'usermodule',
                data: {
                    breadcrumb: {
                        skip: true,
                    }
                },
                loadChildren: () => import('../UserModule/UserModule.routes').then(m => m.UserModuleRoutes)
            }
        ]
    },

    {
        path: '',
        loadComponent: () => import('../Common/Layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
        children: [
            { path: 'auth', loadChildren: () => import('../AuthModule/Auth.Routes').then(m => m.AuthRoutes) }
        ]
    },
];
