import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

import { AuthStoreService } from '../../core/auth/store/auth-store.service';
import { AccountStoreService } from '../store/account-store.service';

@Component({
  selector: 'sc-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

	public accountNav = [
		{
			label:'dashboard',
			value:'',
			path:'dashboard'
		},
		{
			label:'reservations',
			value:'',
			path:'reservations'
		},
		{
			label:'account',
			value:'',
			path:'account'
		},
		{
			label:'support',
			value:'',
			path:'support'
		}
	];
	public user: any;
	public userSubscription: Subscription = new Subscription();


  constructor(
		private accountStoreService: AccountStoreService,
		private authStoreService: AuthStoreService
	) {
		accountStoreService.dispatchGetLocationsAction();
	}

	ngOnInit() {
		this.userSubscription = this.authStoreService.getUser().subscribe(
			user => this.user = user
		);
	}

	ngOnDestroy() {
		this.userSubscription.unsubscribe();
	}

}
