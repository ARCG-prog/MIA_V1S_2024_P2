import { Routes } from '@angular/router';
import { RegistroComponent } from './components/auth/registro/registro.component';

export const routes: Routes = [
    {
        path: 'login', 
        component: RegistroComponent
    },
    {
        path: '',
        component: RegistroComponent
    }
];
