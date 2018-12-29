import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

import { BookingService } from '../services/booking.service';
import { BookingStoreService } from '../store/booking-store.service';

@Component({
  selector: 'sc-date-selection',
  templateUrl: './date-selection.component.html',
  styleUrls: ['./date-selection.component.scss']
})
export class DateSelectionComponent implements OnInit {
	public activeBooking: any;
	public activeBookingSubscription: Subscription = new Subscription();

	public times$;

  constructor(
		public bookingService: BookingService,
		public bookingStoreService: BookingStoreService
	) { }

	ngOnInit() {
		this.bookingService.pageTitle.next('Choose Dates');

		this.activeBookingSubscription = this.bookingStoreService.getActiveBooking().subscribe(
			activeBooking => this.activeBooking = activeBooking
		);
		this.times$ = this.bookingStoreService.getAvailableTimes();
	}

	ngOnDestroy() {
		this.activeBookingSubscription.unsubscribe();
	}
}
