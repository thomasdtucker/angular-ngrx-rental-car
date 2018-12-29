import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { AccountGuard } from './account.guard';
import { AccountService } from './services/account.service';
import { AccountStoreModule } from './store/account-store.module';
import { AccountRoutingModule } from './account-routing.module';

import { AuthGuard } from '../core/auth/auth.guard';
import { AuthStoreModule } from '../core/auth/store/auth-store.module';

import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReservationsComponent } from './reservations/reservations.component';

@NgModule({
	declarations:[
		AccountComponent,
		DashboardComponent,
		ReservationsComponent
	],
  imports: [
		AccountRoutingModule,
		AccountStoreModule,
		AuthStoreModule,
    CommonModule,
		CoreModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule
  ],
	providers: [
		AccountGuard,
		AccountService
	],
})
export class AccountModule { }
