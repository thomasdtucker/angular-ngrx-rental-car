import { Angulartics2 } from 'angulartics2';

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

import { AuthService } from './../services/auth.service';
import * as auth from './auth.actions';

@Injectable()
export class AuthEffects {
	constructor(
		private segment: Angulartics2,
		private api: AuthService,
		private actions$: Actions,
		private router: Router
	) {}

	@Effect()
	loginAction$ = this.actions$
		.ofType<auth.LoginAction>(auth.AuthActions.LOGIN)
		.map(action => action.payload)
		.switchMap(payload =>
			this.api.login(payload)
				.mergeMap(res => [new auth.LoginSuccessAction(res), new auth.GetUserAction])
				.catch(error => {
					return this.handleError(error)
				})
		);

	@Effect({ dispatch: false })
	loginSuccessAction$ = this.actions$
		.ofType<auth.LoginSuccessAction>(auth.AuthActions.LOGIN_SUCCESS)
		.do((action) => {
			this.segment.eventTrack.next({
			  action: 'LOGIN',
			  properties: action
			});
		});

	@Effect({ dispatch: false })
	logoutAction$ = this.actions$
		.ofType<auth.LogoutAction>(auth.AuthActions.LOGOUT)
		.do((action) => {
			this.segment.eventTrack.next({
			  action: 'LOGOUT',
			  properties: action
			});
		})
		.do(() => {
			this.router.navigate(['/'])
		});

	@Effect()
	getUserAction$ = this.actions$
		.ofType<auth.GetUserAction>(auth.AuthActions.GET_USER)
		.map(action => action.payload)
		.switchMap(payload =>
			this.api
				.getUser()
				.map(res => new auth.GetUserSuccessAction(res))
				.catch(error => this.handleError(error))
		);

	@Effect({ dispatch: false })
	GetUserSuccessAction$ = this.actions$
	.ofType<auth.GetUserSuccessAction>(auth.AuthActions.GET_USER_SUCCESS)
	.do(() => {
		this.router.navigate(['/'])
	});

	private handleError(error) {
		this.segment.eventTrack.next({
		  action: 'AUTH ERROR',
		  properties: error
		});
		return Observable.of(new auth.ErrorAction(error));
	}
}
