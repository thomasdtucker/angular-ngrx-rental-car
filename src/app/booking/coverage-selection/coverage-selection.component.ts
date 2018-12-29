import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators/map';

import * as moment from 'moment';
import { BookingService } from '../services/booking.service';
import { BookingStoreService } from '../store/booking-store.service';
import { ActiveBooking, AvailableTimes, Booking, LocationModel, Pricing, ReceiptData, Reservation, ReservationInsurance, Time } from '../models/';

class InsuranceOption{
	name:string;
}

@Component({
	selector: 'sc-coverage-selection',
	templateUrl: './coverage-selection.component.html',
	styleUrls: ['./coverage-selection.component.scss']
})
export class CoverageSelectionComponent implements OnInit {
	public activeBooking: ActiveBooking;
	public activeBookingSubscription: Subscription = new Subscription();
	public corporate_control: FormControl = new FormControl;
	public personal_control: FormControl = new FormControl;

	public insuranceOptions$: any;

	public personal_insurance_carriers: Array<InsuranceOption> = [
		{ name:'AAA' },
		{ name:'21st Century' },
		{ name:'AIG Insurance' },
		{ name:'Allstate' },
		{ name:'American Family' },
		{ name:'American National Property & Casualty' },
		{ name:'Amica' },
		{ name:'AAA Auto Insurance' },
		{ name:'Auto-Owners' },
		{ name:'California State Automobile Association' },
		{ name:'Country Casualty Insurance' },
		{ name:'Eastwood Auto Insurance' },
		{ name:'Encompass' },
		{ name:'Erie' },
		{ name:'Esurance' },
		{ name:'Farmers' },
		{ name:'GEICO' },
		{ name:'The General Auto Insurance' },
		{ name:'GMAC' },
		{ name:'Hanover' },
		{ name:'Hartford' },
		{ name:'Liberty Mutual' },
		{ name:'Mercury' },
		{ name:'MetLife' },
		{ name:'Nationwide' },
		{ name:'Progressive' },
		{ name:'Safe Auto Insurance' },
		{ name:'Safeco' },
		{ name:'Sentry' },
		{ name:'State Farm' },
		{ name:'Travelers' },
		{ name:'USAA Insurance' },
		{ name:'Western Auto Insurance' }
	];

	public corporate_insurance_carriers: Array<InsuranceOption> = [...this.personal_insurance_carriers];

	public filtered_corporate_insurance_carriers: Observable<any>;
	public filtered_personal_insurance_carriers: Observable<any>;

	public personalCarrier: string = '';
	public personalPolicyNumber: string = '';

	public corporateCarrier: string = '';
	public corporatePolicyNumber: string = '';

	constructor(
		public bookingService: BookingService,
		public bookingStoreService: BookingStoreService
	) {
		this.filtered_corporate_insurance_carriers = this.corporate_control.valueChanges.pipe(
			map(name => name ? this.filterCorporate(name) : this.corporate_insurance_carriers.slice())
		);
		this.filtered_personal_insurance_carriers = this.personal_control.valueChanges.pipe(
			map(name => name ? this.filterPersonal(name) : this.corporate_insurance_carriers.slice())
		);

	}

	ngOnInit() {
		this.bookingService.pageTitle.next('Choose Coverage');

		this.activeBookingSubscription = this.bookingStoreService.getActiveBooking().subscribe(
			activeBooking => {
				this.activeBooking = activeBooking;
			}
		);

		this.insuranceOptions$ = this.bookingStoreService.getInsuranceOptions();
	}

	ngOnDestroy() {
		this.activeBookingSubscription.unsubscribe();
	}

	public coverageSelected(option){
		return this.activeBooking.coverage.selectedCoverage.filter(x => x.insurance_option_id === option.id).length;
	}

	public filterCorporate(name: string) {
		return this.corporate_insurance_carriers.filter(x => x.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
	}

	public filterPersonal(name: string) {
		return this.personal_insurance_carriers.filter(x => x.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
	}

	public getAverageDayPrice(){
		let duration = moment(this.activeBooking.dropoffDate).diff( moment(this.activeBooking.pickupDate),'days');
		let total = this.activeBooking.receiptData.pricing.rental.total;

		if(duration && total){
			return total / duration;
		}
		return 0;
	}

	public submitCorporate(){
		this.bookingStoreService.setCorporateCoverage({
			carrier: this.corporateCarrier,
			policy_number: this.corporatePolicyNumber
		})
	}

	public submitPersonal(){
		console.log('submitPersonal',this.personalCarrier);
		this.bookingStoreService.setPersonalCoverage({
			carrier: this.personalCarrier,
			policy_number: this.personalPolicyNumber
		})
	}


}
