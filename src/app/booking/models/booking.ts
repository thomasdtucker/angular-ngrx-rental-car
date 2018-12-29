import * as moment from 'moment';

import { ActiveBooking } from './active-booking';
import { AvailableTimes } from './available-times';

export class Booking {
	activeBooking: ActiveBooking = new ActiveBooking();
	availableTimes: AvailableTimes = new AvailableTimes();
	locations: Array<any> = [];
	locationSearch: string = '';
	insuranceOptions: any;
	isLoading: boolean = false;
	error: any = '';
}
