import { Pricing } from './pricing';

export class ReceiptData {
	awards: any = {};
	balance:number = 0;
	currency_code:string = '';
	currency_symbol:string = '';
	id:number = 0;
	messages:any = {};
	payments: any = {};
	pricing:Pricing = new Pricing;
	total:number = 0;
	trip_details:any = {};
};
