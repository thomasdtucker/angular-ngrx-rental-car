import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { StoreService } from './../../store/app-store.service';
import { AppState } from './../../store/app.reducer';

import * as account from './account.actions';
import * as state from './account.state';

@Injectable()
export class AccountStoreService extends StoreService {
	private accountState = createFeatureSelector<state.AccountState>('account');

	private selectors = state.accountAdapter.getSelectors(this.accountState);

	private error = createSelector(this.accountState, state.selectError);
	private locations = createSelector(this.accountState, state.selectLocations);
	private reservations = createSelector(this.accountState, state.selectReservations);

	constructor(protected store: Store<AppState>) {
		super();
	}

	dispatchGetLocationsAction() {
		this.dispatchAction(new account.GetLocationsAction());
	}

	dispatchGetUpcomingReservationsAction() {
		this.dispatchAction(new account.GetUpcomingReservationsAction());
	}

	getError() {
		return this.store.select(this.error);
	}

	getLocations() {
		return this.store.select(this.locations);
	}

	getReservations() {
		return this.store.select(this.reservations);
	}
}
