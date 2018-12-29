import { Component, OnInit } from '@angular/core';
import { AccountStoreService } from '../store/account-store.service';

import { Subscription } from 'rxjs/Subscription';
import "rxjs/add/operator/take";

@Component({
	selector: 'sc-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	public first_reservation: any;
	public reservations: any
	public reservationSubscription: Subscription = new Subscription();

	constructor(
		private accountStoreService: AccountStoreService
	) {
		this.reservations = accountStoreService.getReservations();
	}

	ngOnInit() {
		this.reservationSubscription = this.accountStoreService.getReservations().subscribe(
			reservations => {
				this.reservations = reservations;
				if(reservations.length){
					this.first_reservation = reservations[0];
					console.log(this.first_reservation);
				}
			}
		);
	}

}
