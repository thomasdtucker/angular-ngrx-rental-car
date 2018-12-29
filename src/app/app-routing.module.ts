import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
	{ path: '', redirectTo: 'account', pathMatch: 'full'},
	{ path: 'account', loadChildren: 'app/account/account.module#AccountModule'},
	{ path: 'booking', loadChildren: 'app/booking/booking.module#BookingModule'},
	{ path: '**', redirectTo: ''}
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
