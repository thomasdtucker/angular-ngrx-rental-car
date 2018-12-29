import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params } from '@angular/router';
import { Angulartics2Segment } from 'angulartics2/segment';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/switchMap';

import { AuthStoreService } from './core/auth/store/auth-store.service';

@Component({
  selector: 'sc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	public isBooking: boolean = false;
	public routeSubscription: Subscription = new Subscription();
	public user: any;
	public userSubscription: Subscription = new Subscription();

	constructor(
		private angulartics2Segment: Angulartics2Segment,
		private authStoreService: AuthStoreService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.userSubscription = this.authStoreService.getUser().subscribe(
			user => this.user = user
		);
		this.routeSubscription = this.router.events
			.subscribe(event => {
				if(event instanceof NavigationEnd) {
					if(event.url.includes('booking') || event.urlAfterRedirects.includes('booking')){
						this.isBooking = true;
					} else {
						this.isBooking = false;
					}
				}
			});
	}

	ngOnDestroy() {
		this.userSubscription.unsubscribe();
		this.routeSubscription.unsubscribe();
	}

}
