import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';


import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import * as moment from 'moment';

import { ActiveBooking, Booking } from '../models';

import { BookingStoreService } from '../store/booking-store.service';
import { BookingService } from '../services/booking.service';

@Component({
	selector: 'sc-booking',
	templateUrl: './booking.component.html',
	styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

	public activeBooking: any = {};
	public activeBookingSubscription: Subscription = new Subscription();

	public bookingNav = [
		{
			label:'city',
			value:'',
			path:'location'
		},
		{
			label:'pick up',
			value:'',
			path:'pickup'
		},
		{
			label:'drop off',
			value:'',
			path:'dropoff'
		},
		{
			label:'vehicle',
			value:'',
			path:'vehicle'
		},
		{
			label:'coverage',
			value:'',
			path:'coverage'
		}
	];
	public error$: Observable<string>;
	public title:string = '';
	public titleSubscription: Subscription = new Subscription();

	constructor(
		private bookingService: BookingService,
		public bookingStoreService: BookingStoreService,
		private route: ActivatedRoute,
		private router: Router

	) {
		bookingStoreService.dispatchGetLocationsAction();
	}

	ngOnInit() {
		this.activeBookingSubscription = this.bookingStoreService.getActiveBooking().subscribe(
			activeBooking => this.activeBooking = activeBooking
		);

		this.titleSubscription = this.bookingService.pageTitle.subscribe(
			title => this.title = title
		);
		this.error$ = this.bookingStoreService.getError();
	}

	ngOnDestroy() {
		this.activeBookingSubscription.unsubscribe();
		this.titleSubscription.unsubscribe();
	}

	public getAverageDayPrice(){
		if(this.activeBooking){
			let duration = moment(this.activeBooking.dropoffDate).diff( moment(this.activeBooking.pickupDate),'days');
			let total = this.activeBooking.receiptData.pricing.rental.total;

			if(duration && total){
				return total / duration;
			}
		}
		return 0;
	}

}
