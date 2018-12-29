import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

import { BookingService } from '../../services/booking.service';
import { BookingStoreService } from '../../store/booking-store.service';

@Component({
	selector: 'sc-vehicle',
	templateUrl: './vehicle.component.html',
	styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
	@Input() vehicle:any;
	@Input() showButton: boolean = false;
	public activeBooking: any = {};
	public activeBookingSubscription: Subscription = new Subscription();

	constructor(
		private bookingService: BookingService,
		private bookingStoreService: BookingStoreService
	) { }

	ngOnInit() {
		this.bookingService.pageTitle.next('Choose Vehicle');

		this.activeBookingSubscription = this.bookingStoreService.getActiveBooking().subscribe(
			activeBooking => {
				if(activeBooking){
					this.activeBooking = activeBooking;
				}
			}
		);
	}
	ngOnDestroy() {
		this.activeBookingSubscription.unsubscribe();
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
