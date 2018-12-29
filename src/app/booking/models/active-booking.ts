import * as moment from 'moment';
import { Coverage } from './coverage';
import { LocationModel } from './location';
import { ReceiptData } from './receipt-data';

export class ActiveBooking {
	location: LocationModel = new LocationModel;
	pickupDate: string = '';
	pickupTime: string = '';
	dropoffDate: string = '';
	dropoffTime: string = '';
	receiptData: ReceiptData = new ReceiptData;
	vehicle: Object = {};
	coverage: Coverage = new Coverage;

	get averageDailyRate():number{
		let duration = moment(this.dropoffDate).diff( moment(this.pickupDate),'days');
		let total = this.receiptData.pricing.rental.total;

		if(duration && total){
			return total / duration;
		}
		return 0;
	}
}
