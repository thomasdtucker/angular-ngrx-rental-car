import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/Observable/from';
import { Subscription } from 'rxjs/Subscription';

import { BookingService } from './../services/booking.service';
import { BookingStoreService } from './booking-store.service';

import * as booking from './booking.actions';

@Injectable()
export class BookingEffects {
	public activeBooking: any;
	constructor(
		private api: BookingService,
		private storeService: BookingStoreService,
		private actions$: Actions,
		private router: Router
	) {
		storeService.getActiveBooking().subscribe(
			activeBooking => this.activeBooking = activeBooking
		);
	}

	@Effect()
	getAvailableTimesAction$ = this.actions$
		.ofType<booking.GetAvailableTimesAction>(booking.BookingActions.GET_AVAILABLE_TIMES)
		.map(action => action.payload)
		.switchMap(payload =>
			this.api.getAvailableTimes()
				.mergeMap(res => [new booking.GetAvailableTimesSuccessAction(res)])
				.catch(error => {
					return this.handleError(error)
				})
		);

	@Effect()
	getAvailableVehiclesAction$ = this.actions$
		.ofType<booking.GetAvailableVehiclesAction>(booking.BookingActions.GET_AVAILABLE_VEHICLES)
		.map(action => action.payload)
		.switchMap(payload =>
			this.api.getAvailableVehicles()
				.mergeMap(res => [new booking.GetAvailableVehiclesSuccessAction(res)])
				.catch(error => {
					return this.handleError(error)
				})
		);

	@Effect()
	getInsuranceOptions$ = this.actions$
		.ofType<booking.GetInsuranceOptions>(booking.BookingActions.GET_INSURANCE_OPTIONS)
		.map(action => action.payload)
		.switchMap(payload =>
			this.api.getCoverageOptions()
				.mergeMap(res => [new booking.GetInsuranceOptionsSuccess(res)])
				.catch(error => {
					return this.handleError(error)
				})
		);

	@Effect()
	getLocationsAction$ = this.actions$
		.ofType<booking.GetLocationsAction>(booking.BookingActions.GET_LOCATIONS)
		.map(action => action.payload)
		.switchMap(payload =>
			this.api.getLocations()
				.mergeMap(res => [new booking.GetLocationsSuccessAction(res)])
				.catch(error => {
					return this.handleError(error)
				})
		);

	@Effect()
 	dropoffDateSelectAction$ = this.actions$
	 	.ofType<booking.DropoffDateSelectAction>(booking.BookingActions.DROPOFF_DATE_SELECT)
		.filter( this.storeService.hasBothDates)
		.map(action => action.payload)
		.mergeMap(() => [new booking.GetAvailableTimesAction()])
		.catch(error => {
			return this.handleError(error)
		});

	@Effect()
	dropoffTimeSelectAction$ = this.actions$
		.ofType<booking.DropoffTimeSelectAction>(booking.BookingActions.DROPOFF_TIME_SELECT)
		.do(() => {
			this.router.navigate(['/booking/vehicle'])
		})
		.mergeMap(() => [new booking.GetAvailableVehiclesAction()])
		.catch(error => {
			return this.handleError(error)
		});

	@Effect({ dispatch: false })
	locationSelectAction$ = this.actions$
		.ofType<booking.LocationSelectionAction>(booking.BookingActions.LOCATION_SELECT)
		.do(() => {
			this.router.navigate(['/booking/pickup'])
		})
		.catch(error => {
			return this.handleError(error)
		});

	@Effect()
	pickupTimeSelectAction$ = this.actions$
		.ofType<booking.PickupTimeSelectAction>(booking.BookingActions.PICKUP_TIME_SELECT)
		.mergeMap(() => [new booking.GetInsuranceOptions()])
		.catch(error => {
			return this.handleError(error)
		});


	@Effect()
	postReservationAction$ = this.actions$
		.ofType<booking.PostReservationAction>(booking.BookingActions.POST_RESERVATION)
		.map(action => action.payload)
		.switchMap(payload =>
			this.api.postReservation()
				.mergeMap(res => [new booking.PostReservationSuccessAction(res)])
				.catch(error => {
					return this.handleError(error)
				})
		);

	@Effect({ dispatch: false })
	postReservationSuccessAction$ = this.actions$
	.ofType<booking.PostReservationSuccessAction>(booking.BookingActions.POST_RESERVATION_SUCCESS)
		.do(() => {
			this.router.navigate(['/account'])
		})
		.catch(error => {
			return this.handleError(error)
		});


 	@Effect({ dispatch: false })
 	vehicleSelectAction$ = this.actions$
 	.ofType<booking.VehicleSelectAction>(booking.BookingActions.VEHICLE_SELECT)
		.do(() => {
			this.router.navigate(['/booking/coverage'])
		})
		.catch(error => {
			return this.handleError(error)
		});

	@Effect()
	searchLocationsAction$ = this.actions$
		.ofType<booking.SearchLocationsAction>(booking.BookingActions.SEARCH_LOCATIONS)
		.debounceTime(400)
		.distinctUntilChanged()
		.map(action => action.payload)
		.switchMap(payload =>
			this.api.searchLocations(payload)
				.mergeMap(res => [new booking.SearchLocationsSuccessAction(res)])
				.catch(error => {
					return this.handleError(error)
				})
		);

	private handleError(error) {
		return Observable.of(new booking.ErrorAction(error));
	}
}
