import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject} from 'rxjs/Subject';
import { Subscription} from 'rxjs/Subscription';

import { AuthStoreService } from '../../core/auth/store/auth-store.service';
import { AccountStoreService } from '../store/account-store.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AccountService {
	private API_AUTH_URL = environment.base_url;
	private API_AUTH_URL_v1 = environment.api_v1;
	private tokenSubscription: Subscription;
	private token: string= '';

  constructor(
		private accountStoreService: AccountStoreService,
		private http: HttpClient,
		private authStoreService: AuthStoreService
	) {
		this.tokenSubscription = this.authStoreService.getToken().subscribe( x => this.token = x);
	}

	public getUpcomingReservations() {
		let headers = new HttpHeaders();
		headers = headers
			.set('Content-Type', 'application/json')
			.set('Authorization',this.token)
			.set('Accept','application/json');

		let options = { headers: headers };
		let params = [
			`inlcude_address=true`,
			`inlcude_dropoff_location=true`,
			`inlcude_flight_detail=true`,
			`inlcude_insurance_option=true`,
			`inlcude_payment=true`,
			`inlcude_pickup_location=true`,
			`inlcude_reservation_insurances=true`,
			`inlcude_statement=true`
		];
		return this.http.get(`${this.API_AUTH_URL_v1}reservations/upcoming?${params.join('&')}`, options);
	}

	public getLocationAssets(location) {
		let headers = new HttpHeaders();
		headers = headers
			.set('Content-Type', 'application/json')
			.set('Authorization',this.token)
			.set('Accept','application/json');

		let options = { headers: headers };
		return this.http.get(`${this.API_AUTH_URL_v1}locations/${location.id}`);
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


}
