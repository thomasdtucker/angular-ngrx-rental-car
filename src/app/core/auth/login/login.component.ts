import { Component, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Login } from '../models/login';
import { AuthStoreService } from '../store/auth-store.service';

@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public login: EventEmitter<any> = new EventEmitter();
	public email: string = '';
	public password: string= '';
	error$: Observable<string>;

  constructor( private authStoreService: AuthStoreService) {
	}

  ngOnInit() {
		this.error$ = this.authStoreService.getError();
  }

	public submitLogin():void{
		const email: string = this.email.trim();
		const password: string = this.password.trim();
		if (email.length && password.length) {
			this.authStoreService.dispatchLoginAction(new Login(email, password));
		}

	}

	public clear(event):void{
		event.target.value = '';
	}

}
