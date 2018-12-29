import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import * as moment from 'moment';

import { StoreService } from './../../store/app-store.service';
import { AppState } from './../../store/app.reducer';
import { ActiveBooking, AvailableTimes, Booking, LocationModel, Pricing, ReceiptData, Reservation, ReservationInsurance, Time } from '../models/';

import * as booking from './booking.actions';
import * as state from './booking.state';

@Injectable()
export class BookingStoreService extends StoreService {
	private bookingState = createFeatureSelector<state.BookingState>('booking');

	private activeBooking 		= createSelector(this.bookingState, state.selectActiveBooking);
	private availableTimes 		= createSelector(this.bookingState, state.selectAvailableTimes);
	private error 						= createSelector(this.bookingState, state.selectError);
	private insuranceOptions 	= createSelector(this.bookingState, state.selectInsuranceOptions);
	private locations 				= createSelector(this.bookingState, state.selectLocations);

	constructor(protected store: Store<AppState>) {
		super();
	}

	// Dispatches
	dispatchGetLocationsAction() {
		this.dispatchAction(new booking.GetLocationsAction());
	}

	dispatchLocationSearch(search) {
		this.dispatchAction(new booking.SearchLocationsAction(search));
	}

	dispatchPostReservation() {
		this.dispatchAction(new booking.PostReservationAction());
	}

	dispatchVehicleSelectAction(vehicle) {
		this.dispatchAction(new booking.VehicleSelectAction(vehicle));
	}


	// Getters
	getActiveBooking() {
		return this.store.select(this.activeBooking);
	}

	getAvailableTimes(){
		return this.store.select(this.availableTimes);
	}

	getError() {
		return this.store.select(this.error);
	}

	getInsuranceOptions() {
		return this.store.select(this.insuranceOptions);
	}

	getLocations() {
		return this.store.select(this.locations);
	}

	// Setters
	setCorporateCoverage(coverage){
		this.dispatchAction(new booking.CoverageCorporateSelectionAction(coverage));
	}

	setPersonalCoverage(coverage){
		this.dispatchAction(new booking.CoveragePersonalSelectionAction(coverage));
	}

	setRentalCoverage(coverage){
		this.dispatchAction(new booking.CoverageRentalSelectionAction(coverage));
	}

	setCoverageByType(coverageType){
		this.dispatchAction(new booking.CoverageTypeSelectionAction(coverageType));
	}

	setLocation(location) {
		this.dispatchAction(new booking.LocationSelectionAction(location));
	}

	setPickupDate(date){
		this.dispatchAction(new booking.PickupDateSelectAction(date));
	}

	setDropoffDate(date){
		this.dispatchAction(new booking.DropoffDateSelectAction(date));
	}

	setPickupTime(time){
		if(time.available){
			this.dispatchAction(new booking.PickupTimeSelectAction(time.start_at));
		}
	}

	setDropoffTime(time){
		if(time.available){
			this.dispatchAction(new booking.DropoffTimeSelectAction(time.start_at));
		}
	}

	setVehicle(vehicle){
		this.dispatchAction(new booking.VehicleSelectAction(vehicle));
	}


	// Private Methods
	hasBothDates(){
		// if(this.getActiveBooking().select('pickupDate')){
		// 	console.log('found it');
		// 	return true;
		// }
		return true;
	}

}
