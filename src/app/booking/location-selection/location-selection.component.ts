import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BookingService } from '../services/booking.service';
import { BookingStoreService } from '../store/booking-store.service';

@Component({
  selector: 'sc-location-selection',
  templateUrl: './location-selection.component.html',
  styleUrls: ['./location-selection.component.scss']
})
export class LocationSelectionComponent implements OnInit {
	public locations$: any;
	public activeBooking: any;
	public activeBookingSubscription: Subscription = new Subscription();

  constructor(
		public bookingService: BookingService,
		public bookingStoreService: BookingStoreService
	) { }

	ngOnInit() {
		this.bookingService.pageTitle.next('Choose Location');
		this.locations$ = this.bookingStoreService.getLocations().map( locations => (locations) ? locations.filter(location => location.bookable):null);

		this.activeBookingSubscription = this.bookingStoreService.getActiveBooking().subscribe(
			activeBooking => this.activeBooking = activeBooking
		);
	}

	ngOnDestroy() {
		this.activeBookingSubscription.unsubscribe();
	}
}
