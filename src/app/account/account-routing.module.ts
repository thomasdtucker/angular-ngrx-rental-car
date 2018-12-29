import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountGuard } from './account.guard';

import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReservationsComponent } from './reservations/reservations.component';

const routes: Routes = [
	{
		path: '', component: AccountComponent,
		children: [
			{path: '', redirectTo: 'dashboard'},
			{path: 'dashboard', component: DashboardComponent},
			{path: 'reservations', component: ReservationsComponent},
			{path: '**', redirectTo: 'dashboard'}
		]
	}
];

export const AccountRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
