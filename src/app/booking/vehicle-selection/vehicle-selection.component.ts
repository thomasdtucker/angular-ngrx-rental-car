import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

import { BookingService } from '../services/booking.service';
import { BookingStoreService } from '../store/booking-store.service';

@Component({
  selector: 'sc-vehicle-selection',
  templateUrl: './vehicle-selection.component.html',
  styleUrls: ['./vehicle-selection.component.scss']
})
export class VehicleSelectionComponent implements OnInit {
	public activeBooking: any = {};
	public activeBookingSubscription: Subscription = new Subscription();

	public vehicleCollection:Array<any> = [
	{
		model: 'Audi A4',
		data_key: 'A4', // created by TM for handling onClick
		main_image: '/assets/images/audi-a4.png',
		features: [
			{icon_image: '/assets/images/wifi.png', description: 'Wi-fi'},
			{icon_image: '/assets/images/satellite-radio.png', description: 'Satellite Radio'},
			{icon_image: '/assets/images/navigation.png', description: 'Navigation'}
		],
		available: false
	},
	{
		model: 'Audi Q5',
		data_key: 'Q5', // created by TM for handling onClick
		main_image: '/assets/images/audi-q5.png',
		features: [
			{icon_image: '/assets/images/wifi.png', description: 'Wi-fi'},
			{icon_image: '/assets/images/satellite-radio.png', description: 'Satellite Radio'},
			{icon_image: '/assets/images/navigation.png', description: 'Navigation'}
		],
		available: false
	}];
	public vehicle:Object = this.vehicleCollection[0];

	public times$;

  constructor(
		public bookingService: BookingService,
		public bookingStoreService: BookingStoreService
	) { }

	ngOnInit() {
		this.bookingService.pageTitle.next('Choose Vehicle');

		this.activeBookingSubscription = this.bookingStoreService.getActiveBooking().subscribe(
			activeBooking => {
				if(activeBooking){
					this.activeBooking = activeBooking;
					if(activeBooking.location.fleet_type === 'q5'){
						this.vehicle = this.vehicleCollection[1];
					}
				}
			}
		);
		this.times$ = this.bookingStoreService.getAvailableTimes();
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
