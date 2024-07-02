import { Routes } from '@angular/router';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
    {
        path: 'registro',
        component: RegistroComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    },
];
