import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BookingStoreService } from './store/booking-store.service';

@Injectable()
export class BookingGuard implements CanActivate {
	constructor(private booking: BookingStoreService, private router: Router) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | boolean {
			return true;
	}
}
