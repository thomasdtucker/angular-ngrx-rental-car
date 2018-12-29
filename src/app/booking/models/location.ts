import { Address } from './address';
export class LocationModel {
	id: number = 0;
	name: string = '';
	airport_code: string = '';
	phone_number: string = '';
	text_number: string = '';
	fleet_type: string = '';
	multi_car_display_name: string = '';
	open_date: string = '';
	close_date: string = '';
	description: string = '';
	time_zone: string = '';
	bookable: boolean = false;
	hours: string = '';
	address: Address = new Address;
}
