import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { StoreService } from './../../../store/app-store.service';
import { AppState } from './../../../store/app.reducer';

import * as auth from './auth.actions';
import * as state from './auth.state';

@Injectable()
export class AuthStoreService extends StoreService {
	private authState = createFeatureSelector<state.AuthState>('auth');

	private selectors = state.authAdapter.getSelectors(this.authState);

	private authenticated = createSelector(this.authState, state.isAuthenticated);
	private error = createSelector(this.authState, state.selectError);
	private user = createSelector(this.authState, state.selectUser);
	private token = createSelector(this.authState, state.selectToken);

	constructor(protected store: Store<AppState>) {
		super();
	}

	dispatchLoginAction(login) {
		this.dispatchAction(new auth.LoginAction(login));
	}

	dispatchLogoutAction() {
		this.dispatchAction(new auth.LogoutAction());
	}

	getError() {
		return this.store.select(this.error);
	}

	getToken() {
		return this.store.select(this.token);
	}

	getUser() {
		return this.store.select(this.user);
	}

	isAuthenticated() {
		return this.store.select(this.authenticated);
	}
}
