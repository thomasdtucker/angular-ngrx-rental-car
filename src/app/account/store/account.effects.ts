import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/Observable/from';

import { AccountService } from './../services/account.service';
import * as account from './account.actions';

@Injectable()
export class AccountEffects {
	constructor(
		private api: AccountService,
		private actions$: Actions,
		private router: Router
	) {}


	@Effect()
	getLocationsAction$ = this.actions$
		.ofType<account.GetLocationsAction>(account.AccountActions.GET_LOCATIONS)
		.switchMap(payload =>
			this.api.getLocations()
				.mergeMap(res => [new account.GetLocationsSuccessAction(res),new account.GetUpcomingReservationsAction()])
				.catch(error => {
					return this.handleError(error)
				})
		);

	@Effect()
	getUpcomingReservations$ = this.actions$
		.ofType<account.GetUpcomingReservationsAction>(account.AccountActions.GET_UPCOMING_RESERVATIONS)
		.switchMap(payload =>
			this.api.getUpcomingReservations()
				.mergeMap(res => [new account.GetUpcomingReservationsSuccessAction(res)])
				.catch(error => {
					return this.handleError(error)
				})
		);

	private handleError(error) {
		return Observable.of(new account.ErrorAction(error));
	}
}
