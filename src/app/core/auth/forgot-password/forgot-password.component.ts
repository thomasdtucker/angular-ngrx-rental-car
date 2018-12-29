import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Login } from '../models/login';
import { AuthStoreService } from '../store/auth-store.service';

@Component({
  selector: 'sc-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
	public email: string = '';
	public error$: Observable<string>;

	constructor( private authStoreService: AuthStoreService) {
	}

	ngOnInit() {
		this.error$ = this.authStoreService.getError();
	}

	public clear(event):void{
		event.target.value = '';
	}

	public submitForm():void{
		const email: string = this.email.trim();
		if (email.length) {
			//this.authStoreService.dispatchForgotPasswordAction(email);
		}

	}
}
