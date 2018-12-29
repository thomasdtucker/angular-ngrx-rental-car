import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject} from 'rxjs/Subject';
import { Subscription} from 'rxjs/Subscription';

import { Booking } from '../models/booking';
import { ActiveBooking } from '../models/active-booking';
import { AuthStoreService } from '../../core/auth/store/auth-store.service';
import { BookingStoreService } from '../store/booking-store.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class BookingService {
	private API_AUTH_URL = environment.base_url;
	private API_AUTH_URL_v1 = environment.api_v1;
	private tokenSubscription: Subscription;
	private token: string= '';

	private activeBooking:any;
	private activeBookingSubscription: Subscription = new Subscription();

	public pageTitle: Subject<string> = new Subject();

  constructor(
		private bookingStoreService: BookingStoreService,
		private http: HttpClient,
		private authStoreService: AuthStoreService
	) {
		this.tokenSubscription = this.authStoreService.getToken().subscribe( x => this.token = x);
		this.activeBookingSubscription = this.bookingStoreService.getActiveBooking().subscribe(
			x => this.activeBooking = x
		);
	}

	public getAvailableTimes() {
		return this.http.get(`${this.API_AUTH_URL}airports/${this.activeBooking.location.airport_code}/availability?pickup_on=${this.activeBooking.pickupDate}&dropoff_on=${this.activeBooking.dropoffDate}`);
	}

	public getAvailableVehicles() {
		let headers = new HttpHeaders();
		headers = headers
			.set('Content-Type', 'application/json')
			.set('Authorization',this.token)
			.set('Accept','application/json');

		let options = { headers: headers };
		let params = [
			`reservation[pickup_location_id]=${this.activeBooking.location.id}`,
			`reservation[dropoff_location_id]=${this.activeBooking.location.id}`,
			`reservation[pickup]=${this.activeBooking.pickupTime}`,
			`reservation[dropoff]=${this.activeBooking.dropoffTime}`,

			`reservation[reservation_insurances_attributes][0][carrier]=''`,
			`reservation[reservation_insurances_attributes][0][insurance_option_id]=1`,
			`reservation[reservation_insurances_attributes][0][is_corporate]=false`,
			`reservation[reservation_insurances_attributes][0][is_personal]=false`,
			`reservation[reservation_insurances_attributes][0][is_Rental]=true`,
			`reservation[reservation_insurances_attributes][0][carrier]=''`
		];
		return this.http.get(`${this.API_AUTH_URL_v1}reservations/check_availability?${params.join('&')}`);
	}

	public getCoverageOptions(){
		let headers = new HttpHeaders();
		headers = headers
			.set('Content-Type', 'application/json')
			.set('Authorization',this.token)
			.set('Accept','application/json');

		let options = { headers: headers };
		let params = [
			`pickup_time=${this.activeBooking.pickupDate}`
		];
		return this.http.get(`${this.API_AUTH_URL_v1}insurance_options?${params.join('&')}`);
	}

	public getLocations() {
		let headers = new HttpHeaders();
		headers = headers
			.set('Content-Type', 'application/json')
			.set('API-Version','2')
			.set('Accept','application/json');

		let options = { headers: headers };
		return this.http.get(this.API_AUTH_URL + 'locations', options);
	}

	public postReservation(){
		let headers = new HttpHeaders();
		headers = headers
			.set('Content-Type', 'application/json')
			.set('Authorization',this.token)
			.set('Accept','application/json');

		let options = { headers: headers };
		let reservation = {
			pickup_location_id: this.activeBooking.location.id,
			dropoff_location_id: this.activeBooking.location.id,
			pickup: this.activeBooking.pickupTime,
			dropoff:this.activeBooking.dropoffTime,
			promo_code_id:'',
			reservation_insurances_attributes:this.activeBooking.coverage.selectedCoverage
		};

		return this.http.post(this.API_AUTH_URL_v1 + 'reservations?include_dropoff_location=true&include_pickup_location=true&include_promo_code=true&include_reservation_insurances=true', reservation, options);
	}

	public searchLocations(search) {
		let headers = new HttpHeaders();
		headers = headers
			.set('Content-Type', 'application/json')
			.set('API-Version','2')
			.set('Accept','application/json');

		let options = { headers: headers };
		return this.http.get(this.API_AUTH_URL + 'locations/search?filter=' + search, options);
	}

}
