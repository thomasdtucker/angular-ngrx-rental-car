import { ReservationInsurance } from './reservation-insurance';

export class Reservation {
	pickup_location_id: number = 0;
	dropoff_location_id: number = 0;
	pickup: string = '';
	dropoff: string = '';
	promo_code_id: number = 0;
	reseration_insurances_attributes: Array<ReservationInsurance> = [];
}
