import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthStoreService } from '../store/auth-store.service';

@Component({
  selector: 'sc-send-confirmation',
  templateUrl: './send-confirmation.component.html',
  styleUrls: ['./send-confirmation.component.scss']
})
export class SendConfirmationComponent implements OnInit {
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
			//this.authStoreService.dispatchSendConfirmationAction(email);
		}

	}
}
