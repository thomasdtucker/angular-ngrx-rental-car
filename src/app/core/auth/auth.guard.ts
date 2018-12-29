import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthStoreService } from './store/auth-store.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private authStoreService: AuthStoreService, private router: Router) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | boolean {
			let authenticated = false;
			this.authStoreService.isAuthenticated().subscribe( x => authenticated = x);
			if (authenticated) return true;
			console.log('access denied!')
			this.router.navigate(['auth']);
			return false;
	}
}
