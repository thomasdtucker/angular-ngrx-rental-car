import { Rental } from './rental';
export class Pricing {
	adjustments:any = '';
	coverage:any = '';
	credits:any = '';
	discount:any = '';
	fees_and_concessions:Object = {};
	fuel:any = '';
	rental:Rental = new Rental;
	security_deposit:Object = {};
	taxes:Object = {};
	tolls:any = '';
};
