import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Login } from './../models/login';
import { AuthStoreService } from '../store/auth-store.service';
import { Observable } from 'rxjs/Observable';
import { Subscription} from 'rxjs/Subscription';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthService {
	private API_AUTH_URL = environment.base_url;
	private tokenSubscription: Subscription;
	private token: string= '';

	constructor(
		private http: HttpClient,
		private authStoreService: AuthStoreService
	) {
		this.tokenSubscription = this.authStoreService.getToken().subscribe( x => this.token = x);
	}

	public login(login:Login) {
		let headers = new HttpHeaders();
		headers = headers
			.set('Content-Type', 'application/json')
			.set('API-Version','2')
			.set('Accept','application/json');

		let options = { headers: headers };
		return this.http.post(this.API_AUTH_URL + 'login', login, options);
  }

	public getUser() {
		let headers = new HttpHeaders();
		headers = headers
			.set('Content-Type', 'application/json')
			.set('API-Version','2')
			.set('Authorization',this.token)
			.set('Accept','application/json');

		let options = { headers: headers };
		return this.http.get(this.API_AUTH_URL + 'user', options);
	}
}
