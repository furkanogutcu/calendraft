import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubNavComponent } from './subnav.component';
import { LayoutComponent } from './layout.component';
import { OverviewComponent } from './overview.component';


const accountsModule = () => import('./accounts/accounts.module').then(x => x.AccountsModule);
const servicesModule = () => import('./services/services.module').then(x => x.ServicesModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const appointmentModule= () => import('./appointments/appointments.module').then(x=>x.AppointmentsModule);


const routes: Routes = [
    { path: '', component: SubNavComponent, outlet: 'subnav' },
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: OverviewComponent },
            { path: 'accounts', loadChildren: accountsModule },
            { path: 'services', loadChildren: servicesModule },
            { path: 'users',    loadChildren:usersModule},
            { path: 'appointments', loadChildren:appointmentModule}

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }